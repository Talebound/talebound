import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import { $applyNodeReplacement, createEditor, DecoratorNode } from 'lexical';
import * as React from 'react';
import { Suspense } from 'react';
import { getImageVariantFromUrl, ImageVariantWidths } from '../../../../utils/images/imageUtils';

const InlineImageComponent = React.lazy(
  () => import('../InlineImageComponent/InlineImageComponent'),
);

export enum ImagePosition {
  Left = 'left',
  Right = 'right',
  None = 'none',
}

export interface InlineImagePayload {
  key?: NodeKey;
  src: string;
  altText: string;
  width?: number;
  height?: number;
  showCaption?: boolean;
  caption?: LexicalEditor;
  position?: ImagePosition;
}

export interface UpdateInlineImagePayload {
  src?: string;
  altText?: string;
  showCaption?: boolean;
  position?: ImagePosition;
}

function convertInlineImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt: altText, src, width, height } = domNode;
    const node = $createInlineImageNode({ altText, height, src, width });
    return { node };
  }
  return null;
}

export type SerializedInlineImageNode = Spread<
  {
    src: string;
    altText: string;
    width?: number;
    height?: number;
    showCaption: boolean;
    caption: SerializedEditor;
    position?: ImagePosition;
  },
  SerializedLexicalNode
>;

export class InlineImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __width: 'inherit' | number;
  __height: 'inherit' | number;
  __showCaption: boolean;
  __caption: LexicalEditor;
  __position: ImagePosition;

  static getType(): string {
    return 'inline-image';
  }

  static clone(node: InlineImageNode): InlineImageNode {
    return new InlineImageNode(
      node.__src,
      node.__altText,
      node.__position,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__key,
    );
  }

  constructor(
    src: string,
    altText: string,
    position: ImagePosition = ImagePosition.None,
    width?: 'inherit' | number,
    height?: 'inherit' | number,
    showCaption?: boolean,
    caption?: LexicalEditor,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__position = position;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption = caption || createEditor();
  }

  static importJSON(serializedNode: SerializedInlineImageNode): InlineImageNode {
    const { altText, height, width, caption, src, showCaption, position } = serializedNode;
    const node = $createInlineImageNode({
      altText,
      height,
      position,
      showCaption,
      src,
      width,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_node: Node) => ({
        conversion: convertInlineImageElement,
        priority: 0,
      }),
    };
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    return { element };
  }

  exportJSON(): SerializedInlineImageNode {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      position: this.__position,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: 'inline-image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  setAltText(altText: string): void {
    const writable = this.getWritable();
    writable.__altText = altText;
  }

  setWidthAndHeight(width: 'inherit' | number, height: 'inherit' | number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  getShowCaption(): boolean {
    return this.__showCaption;
  }

  setShowCaption(showCaption: boolean): void {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  getPosition(): ImagePosition {
    return this.__position;
  }

  setPosition(position: ImagePosition): void {
    const writable = this.getWritable();
    writable.__position = position;
  }

  update(payload: UpdateInlineImagePayload): void {
    const writable = this.getWritable();
    const { src, altText, showCaption, position } = payload;
    if (src !== undefined) {
      writable.__src = src;
      //in case we change source of the image, we check if it was not cloudflare image - if yes, we change width based on variant
      const variant = getImageVariantFromUrl(src);
      if (variant) {
        const span = document.querySelector(`span[data-info="image-node"]`);
        if (span) {
          const width = ImageVariantWidths[variant];
          if (width) (span as HTMLElement).style.width = `${width}px`;
        }
      }
    }
    if (altText !== undefined) {
      writable.__altText = altText;
    }
    if (showCaption !== undefined) {
      writable.__showCaption = showCaption;
    }
    if (position !== undefined) {
      writable.__position = position;
      if (position === 'none') {
        this.setWidthAndHeight('inherit', 'inherit');
      }
    }
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    if (this.__width !== 'inherit') {
      span.style.width = `${this.__width}px`;
    } else {
      const variant = getImageVariantFromUrl(this.__src);
      if (variant) {
        const width = ImageVariantWidths[variant];
        if (width) span.style.width = `${width}px`;
      } else {
        span.style.width = `200px`;
      }
    }

    span.className = `${config.theme.inlineImage} position-${this.__position}`;
    span.setAttribute('data-info', 'image-node');
    return span;
  }

  updateDOM(prevNode: InlineImageNode, dom: HTMLElement, config: EditorConfig): false {
    const position = this.__position;
    if (position !== prevNode.__position) {
      dom.className = `${config.theme.inlineImage} position-${position}`;
    }
    return false;
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <InlineImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          maxWidth={1000}
          height={this.__height}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          position={this.__position}
        />
      </Suspense>
    );
  }
}

export function $createInlineImageNode({
  src,
  altText,
  position,
  width,
  height,
  showCaption,
  caption,
  key,
}: InlineImagePayload): InlineImageNode {
  return $applyNodeReplacement(
    new InlineImageNode(src, altText, position, width, height, showCaption, caption, key),
  );
}

export function $isInlineImageNode(node: LexicalNode | null | undefined): node is InlineImageNode {
  return node instanceof InlineImageNode;
  // return node?.getType() === 'inline-image';
}

export function $isInlineImagePosition(value: string | undefined): value is ImagePosition {
  return ['left', 'right', 'none', undefined].includes(value);
}
