import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import * as React from 'react';
import { MARKDOWN_TRANSFORMERS } from './markdownTransformers';

export default function MarkdownPlugin(): React.JSX.Element {
  return <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />;
}
