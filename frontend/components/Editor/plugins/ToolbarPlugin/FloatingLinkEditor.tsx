import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SELECTION_CHANGE_COMMAND,
  $getSelection,
  $isRangeSelection,
  LexicalEditor,
  RangeSelection,
  NodeSelection,
  GridSelection,
} from 'lexical';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { mergeRegister } from '@lexical/utils';
import { LOW_PRIORITY } from './ToolbarPlugin';
import {
  LinkEditIcon,
  LinkEditor,
  LinkEditorDiv,
  LinkEditorInput,
  LinkEditorLink,
} from './componentsLinkEditor';
import { BsPencil } from 'react-icons/bs';
import { getSelectedNode } from './toolbarLib';

function positionEditorElement(editor: HTMLDivElement, rect: DOMRect | null) {
  if (rect === null) {
    editor.style.opacity = '0';
    editor.style.top = '-1000px';
    editor.style.left = '-1000px';
  } else {
    editor.style.opacity = '1';
    editor.style.top = `${rect.top + rect.height + window.scrollY + 10}px`;
    // editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${
      rect.left + window.scrollX - editor.offsetWidth / 2 + rect.width / 2
      // rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2
    }px`;
  }
}

interface FloatingLinkEditorProps {
  editor: LexicalEditor;
}

const FloatingLinkEditor: React.FC<FloatingLinkEditorProps> = ({ editor }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mouseDownRef = useRef(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | NodeSelection | GridSelection | null
  >(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null &&
      !nativeSelection?.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection?.anchorNode ?? null)
    ) {
      const domRange = nativeSelection?.getRangeAt(0);
      let rect;
      if (nativeSelection?.anchorNode === rootElement) {
        let inner: Element | null = rootElement;
        while (inner.firstElementChild !== null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange?.getBoundingClientRect() ?? null;
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== 'link-input') {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl('');
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor();
        });
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor();
          return true;
        },
        LOW_PRIORITY,
      ),
    );
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const inputChangeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(event.target.value);
  }, []);

  const inputOnKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (lastSelection !== null) {
          if (linkUrl !== '') {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
          }
          setEditMode(false);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setEditMode(false);
      }
    },
    [editor, lastSelection, linkUrl],
  );

  // const divOnMouseDownHandler = useCallback(
  //   (event: React.MouseEvent<HTMLDivElement>) => event.preventDefault(),
  //   [],
  // );
  const divOnClickHandler = useCallback(() => setEditMode(true), []);

  return (
    <LinkEditor ref={editorRef}>
      {isEditMode ? (
        <LinkEditorInput
          ref={inputRef}
          value={linkUrl}
          onChange={inputChangeHandler}
          onKeyDown={inputOnKeyDownHandler}
        />
      ) : (
        <LinkEditorDiv>
          <LinkEditorLink href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkUrl}
          </LinkEditorLink>
          <LinkEditIcon
            tabIndex={0}
            // onMouseDown={divOnMouseDownHandler}
            onClick={divOnClickHandler}
          >
            <BsPencil />
          </LinkEditIcon>
        </LinkEditorDiv>
      )}
    </LinkEditor>
  );
};

export default FloatingLinkEditor;
