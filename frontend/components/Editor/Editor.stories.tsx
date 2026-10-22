import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect, fn, userEvent, within } from 'storybook/test';
import Editor, { type EditorOnSaveAction, PostViewType } from './Editor';
import { SharedHistoryContext } from './context/SharedHistoryContext';
import legacyDocument from './fixtures/lexical-0.12.json';

const meta = {
  title: '4. Components/Editor',
  component: Editor,
  decorators: [
    (Story) => (
      <SharedHistoryContext>
        <Story />
      </SharedHistoryContext>
    ),
  ],
  args: {
    editorState: JSON.stringify(legacyDocument),
    hasRightToEdit: true,
    alreadyExists: true,
  },
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyDocument: Story = {
  args: {
    editorState: undefined,
    onSaveAction: fn<EditorOnSaveAction>(
      (_state, _editor, _draft, onSuccess, _onError, onSettled) => {
        onSuccess?.();
        onSettled?.();
      },
    ),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Edit' }));
    const editor = canvas.getByRole('textbox', { name: 'Rich text editor' });
    await expect(editor).toHaveAttribute('contenteditable', 'true');
    await userEvent.type(editor, 'A');
    await expect(editor).toHaveTextContent('A');
    await userEvent.click(await canvas.findByRole('button', { name: 'Save' }));
    await expect(args.onSaveAction).toHaveBeenCalledTimes(1);
    await expect(editor).toHaveAttribute('contenteditable', 'false');
  },
};

// Captured with Lexical 0.12.2, including the application's version-1 image schema.
// Keep this fixture unchanged: existing posts must remain readable after upgrades.
export const LegacyDocument: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByRole('heading', { name: 'Legacy chapter' })).toBeVisible();
    await expect(canvas.getByText('Bold legacy text')).toBeVisible();
    await expect(canvas.getByText('Legacy bullet')).toBeVisible();
    await expect(canvas.getByText('Legacy ordered item')).toBeVisible();
    await expect(canvas.getByRole('link', { name: 'Example' })).toHaveAttribute(
      'href',
      'https://example.com',
    );
    await expect(canvas.getByRole('table')).toBeVisible();
    await expect(await canvas.findByAltText('Legacy illustration')).toBeVisible();
    await expect(await canvas.findByText('Legacy image caption')).toBeVisible();
  },
};

export const EditLegacyDocument: Story = {
  args: { defaultPostViewType: PostViewType.EDIT },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = await canvas.findByText('Legacy final paragraph');
    await userEvent.click(paragraph);
    await userEvent.keyboard('{End} edited');
    await expect(canvas.getByRole('textbox', { name: 'Rich text editor' })).toHaveTextContent(
      'Legacy final paragraph edited',
    );
    await userEvent.click(canvas.getByRole('button', { name: 'Undo' }));
    await expect(canvas.getByText('Legacy final paragraph', { exact: true })).toBeVisible();
    await userEvent.click(canvas.getByRole('button', { name: 'Redo' }));
    await expect(canvas.getByText('Legacy final paragraph edited', { exact: true })).toBeVisible();
  },
};
