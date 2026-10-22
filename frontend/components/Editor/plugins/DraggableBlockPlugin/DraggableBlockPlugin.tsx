import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import DraggableBlockMenu from './DraggableBlockMenu';

export default function DraggableBlockPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  return DraggableBlockMenu(editor, anchorElem, editor._editable);
}
