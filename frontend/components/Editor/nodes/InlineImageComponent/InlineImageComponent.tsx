import type { ImagePosition } from '../InlineImageNode/InlineImageNode';
import { $isInlineImageNode } from '../InlineImageNode/InlineImageNode';
import type { GridSelection, LexicalEditor, NodeKey, NodeSelection, RangeSelection } from 'lexical';
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LexicalNestedComposer } from '@lexical/react/LexicalNestedComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import * as React from 'react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import Placeholder from '../../ui/Placeholder';
import { styled } from '../../../../styles/stitches.config';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { Button } from '../../../Button/Button';
import { LazyImage } from './LazyImage';
import ImageResizer from '../../ui/ImageResizer';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useSharedHistoryContext } from '../../context/SharedHistoryContext';
import EditorImageModal from '../ImageModal/EditorImageModal';
import { updateInlineImagePayload } from '../ImageModal/editorImageModalSlice';
import { useDispatch } from 'react-redux';
import { EditorImageModalMode } from '../ImageModal/editorImageModalLib';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';

const InlineImageNodeContentEditable = styled(ContentEditable, {
  minHeight: '20px',
  border: '0px',
  resize: 'none',
  cursor: 'text',
  caretColor: '$black900',
  display: 'block',
  position: 'relative',
  tabSize: '1',
  outline: '0px',
  padding: '$2',
  userSelect: 'text',
  fontSize: '$md',
  lineHeight: '1.4em',

  width: 'calc(100% - 20px)',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
});

const InlineImageNodePlaceholder = styled(Placeholder, {
  fontSize: '13px',
  color: '#888',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  bottom: '4px',
  left: '4px',
  top: 'auto',
  right: 'auto',
  userSelect: 'none',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  pointerEvents: 'none',
});

const ImageCaptionContainer = styled('div', {
  display: 'block',
  backgroundColor: '$white600',
  minWidth: '100%',
  color: '#000',
  overflow: 'hidden',
  minHeight: '28px',

  '& p.editor-paragraph': {
    fontSize: '13px',
    color: '$primary800',
  },
});

const ImageComponentWrapper = styled('div', {
  variants: {
    focused: {
      true: {
        outline: '2px solid $primary500',
      },
    },
  },
});

export default function InlineImageComponent({
  src,
  altText,
  nodeKey,
  width,
  maxWidth,
  height,
  showCaption,
  caption,
  position,
  resizable = true,
}: {
  altText: string;
  caption: LexicalEditor;
  height: 'inherit' | number;
  nodeKey: NodeKey;
  showCaption: boolean;
  src: string;
  width: 'inherit' | number;
  maxWidth: number;
  position: ImagePosition;
  resizable?: boolean;
}): JSX.Element {
  const dispatch = useDispatch();
  const { historyState } = useSharedHistoryContext();
  const imageRef = useRef<null | HTMLImageElement>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(
    null,
  );
  const [showImageModal, setShowImageModal] = useState(false);
  const activeEditorRef = useRef<LexicalEditor | null>(null);

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload;
        event.preventDefault();
        const node = $getNodeByKey(nodeKey);
        if ($isInlineImageNode(node)) {
          node.remove();
        }
      }
      return false;
    },
    [isSelected, nodeKey],
  );

  const onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection();
      const buttonElem = buttonRef.current;
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (showCaption) {
          // Move focus into nested editor
          $setSelection(null);
          event.preventDefault();
          caption.focus();
          return true;
        } else if (buttonElem !== null && buttonElem !== document.activeElement) {
          event.preventDefault();
          buttonElem.focus();
          return true;
        }
      }
      return false;
    },
    [caption, isSelected, showCaption],
  );

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (activeEditorRef.current === caption || buttonRef.current === event.target) {
        $setSelection(null);
        editor.update(() => {
          setSelected(true);
          const parentRootElement = editor.getRootElement();
          if (parentRootElement !== null) {
            parentRootElement.focus();
          }
        });
        return true;
      }
      return false;
    },
    [caption, editor, setSelected],
  );

  useEffect(() => {
    let isMounted = true;
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()));
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor;
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload;
          if (isResizing) {
            return true;
          }
          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected);
            } else {
              clearSelection();
              setSelected(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault();
            return true;
          }
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_LOW),
    );
    return () => {
      isMounted = false;
      unregister();
    };
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    onEnter,
    onEscape,
    setSelected,
  ]);

  const onResizeEnd = useCallback(
    (nextWidth: 'inherit' | number, nextHeight: 'inherit' | number) => {
      // Delay hiding the resize bars for click case
      setTimeout(() => {
        // setIsResizing(false);
      }, 200);

      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if ($isInlineImageNode(node)) {
          node.setWidthAndHeight(nextWidth, nextHeight);
        }
      });
    },
    [editor, nodeKey],
  );

  const onResizeStart = useCallback(() => {
    // setIsResizing(true);
  }, []);

  const onEdit = useCallback(() => {
    dispatch(
      updateInlineImagePayload({
        src: src,
        altText: altText,
        showCaption: showCaption,
        position: position,
      }),
    );
    setShowImageModal(true);
  }, [altText, dispatch, position, showCaption, src]);

  const draggable = isSelected && $isNodeSelection(selection);
  const isFocused = isSelected;

  return (
    <Suspense fallback={null}>
      <>
        <ImageComponentWrapper draggable={draggable} focused={isFocused}>
          {isFocused && (
            <Button
              css={{
                position: 'absolute',
                right: 12,
                top: 12,
                cursor: 'pointer',
                userSelect: 'none',
                opacity: 0.7,
                ':hover': {
                  opacity: 1,
                },
              }}
              ref={buttonRef}
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
          <LazyImage
            grabbable={isFocused && $isNodeSelection(selection)}
            position={position}
            src={src}
            altText={altText}
            imageRef={imageRef}
            width={width}
            height={height}
          />
          {showCaption && (
            <ImageCaptionContainer>
              <LexicalNestedComposer initialEditor={caption}>
                <AutoFocusPlugin />
                <LinkPlugin />
                <HistoryPlugin externalHistoryState={historyState} />
                <RichTextPlugin
                  contentEditable={<InlineImageNodeContentEditable />}
                  placeholder={
                    <InlineImageNodePlaceholder>Enter a caption...</InlineImageNodePlaceholder>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
              </LexicalNestedComposer>
            </ImageCaptionContainer>
          )}
        </ImageComponentWrapper>
        {resizable && $isNodeSelection(selection) && isFocused && (
          <ImageResizer
            editor={editor}
            imageRef={imageRef}
            maxWidth={maxWidth}
            onResizeStart={onResizeStart}
            onResizeEnd={onResizeEnd}
          />
        )}
      </>
      <EditorImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        mode={EditorImageModalMode.Update}
        editor={editor}
        trigger={null}
        nodeKey={nodeKey}
      />
    </Suspense>
  );
}
