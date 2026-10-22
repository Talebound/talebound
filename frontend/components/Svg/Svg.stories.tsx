import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';
import { expect, within } from 'storybook/test';
import Logo from '../../public/assets/unused/logo.svg';
import logoImage from '../../public/assets/unused/logo.svg?url';

const meta = {
  title: '4. Components/SVG imports',
  render: () => (
    <div>
      <Logo role="img" aria-label="SVG component" width={120} height={120} />
      <Image src={logoImage} alt="SVG image" width={120} height={120} />
    </div>
  ),
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ImportModes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('img', { name: 'SVG component' }).tagName).toBe('svg');
    await expect(canvas.getByRole('img', { name: 'SVG image' })).toHaveAttribute(
      'src',
      expect.stringContaining('.svg'),
    );
  },
};
