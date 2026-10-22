import type { LexicalEditor } from 'lexical';

import * as React from 'react';
import { useRef } from 'react';
import { styled } from '../../../styles/stitches.config';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const Direction = {
  east: 1 << 0,
  north: 1 << 3,
  south: 1 << 1,
  west: 1 << 2,
};

const ImageResizerPoint = styled('div', {
  display: 'block',
  width: '8px',
  height: '8px',
  position: 'absolute',
  backgroundColor: '$primary',
  borderRadius: '50%',
  border: '1px solid #fff',

  variants: {
    direction: {
      north: {
        top: '-6px',
        left: '50%',
        translateY: '-50%',
        cursor: 'n-resize',
      },
      south: {
        bottom: '-6px',
        left: '50%',
        translateY: '-50%',
        cursor: 's-resize',
      },
      east: {
        right: '-6px',
        top: '50%',
        translateX: '-50%',
        cursor: 'e-resize',
      },
      west: {
        left: '-6px',
        top: '50%',
        translateX: '-50%',
        cursor: 'w-resize',
      },
      northeast: {
        top: '-6px',
        right: '-6px',
        translateX: '-50%',
        translateY: '-50%',
        cursor: 'ne-resize',
      },
      northwest: {
        top: '-6px',
        left: '-6px',
        translateX: '-50%',
        translateY: '-50%',
        cursor: 'nw-resize',
      },
      southeast: {
        bottom: '-6px',
        right: '-6px',
        translateX: '-50%',
        translateY: '-50%',
        cursor: 'se-resize',
      },
      southwest: {
        bottom: '-6px',
        left: '-6px',
        translateX: '-50%',
        translateY: '-50%',
        cursor: 'sw-resize',
      },
    },
  },
});

export default function ImageResizer({
  onResizeStart,
  onResizeEnd,
  imageRef,
  maxWidth,
  editor,
}: {
  editor: LexicalEditor;
  imageRef: { current: null | HTMLElement };
  maxWidth?: number;
  onResizeEnd: (width: 'inherit' | number, height: 'inherit' | number) => void;
  onResizeStart: () => void;
}): JSX.Element {
  const controlWrapperRef = useRef<HTMLDivElement>(null);
  const userSelect = useRef({
    priority: '',
    value: 'default',
  });
  const positioningRef = useRef<{
    currentHeight: 'inherit' | number;
    currentWidth: 'inherit' | number;
    direction: number;
    isResizing: boolean;
    ratio: number;
    startHeight: number;
    startWidth: number;
    startX: number;
    startY: number;
  }>({
    currentHeight: 0,
    currentWidth: 0,
    direction: 0,
    isResizing: false,
    ratio: 0,
    startHeight: 0,
    startWidth: 0,
    startX: 0,
    startY: 0,
  });
  const editorRootElement = editor.getRootElement();
  // Find max width, accounting for editor padding.
  const maxWidthContainer = maxWidth
    ? maxWidth
    : editorRootElement !== null
    ? editorRootElement.getBoundingClientRect().width - 20
    : 100;
  const maxHeightContainer =
    editorRootElement !== null ? editorRootElement.getBoundingClientRect().height - 20 : 100;

  const minWidth = 100;
  const minHeight = 100;

  const setStartCursor = (direction: number) => {
    const ew = direction === Direction.east || direction === Direction.west;
    const ns = direction === Direction.north || direction === Direction.south;
    const nwse =
      (direction & Direction.north && direction & Direction.west) ||
      (direction & Direction.south && direction & Direction.east);

    const cursorDir = ew ? 'ew' : ns ? 'ns' : nwse ? 'nwse' : 'nesw';

    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', `${cursorDir}-resize`, 'important');
      userSelect.current.value = document.body.style.getPropertyValue('-webkit-user-select');
      userSelect.current.priority = document.body.style.getPropertyPriority('-webkit-user-select');
      document.body.style.setProperty('-webkit-user-select', `none`, 'important');
    }
  };

  const setEndCursor = () => {
    if (editorRootElement !== null) {
      editorRootElement.style.setProperty('cursor', 'text');
    }
    if (document.body !== null) {
      document.body.style.setProperty('cursor', 'default');
      document.body.style.setProperty(
        '-webkit-user-select',
        userSelect.current.value,
        userSelect.current.priority,
      );
    }
  };

  const setWidth = (image: HTMLElement, width: number) => {
    image.style.width = `${width}px`;
    const wholeImageElement = image.closest('span.inline-editor-image') as HTMLSpanElement;
    if (wholeImageElement) {
      wholeImageElement.style.width = `${width}px`;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>, direction: number) => {
    if (!editor.isEditable()) {
      return;
    }

    const image = imageRef.current;
    const controlWrapper = controlWrapperRef.current;

    if (image !== null && controlWrapper !== null) {
      event.preventDefault();
      const { width, height } = image.getBoundingClientRect();
      const positioning = positioningRef.current;
      positioning.startWidth = width;
      positioning.startHeight = height;
      positioning.ratio = width / height;
      positioning.currentWidth = width;
      positioning.currentHeight = height;
      positioning.startX = event.clientX;
      positioning.startY = event.clientY;
      positioning.isResizing = true;
      positioning.direction = direction;

      setStartCursor(direction);
      onResizeStart();

      controlWrapper.classList.add('image-control-wrapper--resizing');
      image.style.height = `${height}px`;
      setWidth(image, width);

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    const image = imageRef.current;
    const positioning = positioningRef.current;

    const isHorizontal = positioning.direction & (Direction.east | Direction.west);
    const isVertical = positioning.direction & (Direction.south | Direction.north);

    if (image !== null && positioning.isResizing) {
      // Corner cursor
      if (isHorizontal && isVertical) {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);

        const height = width / positioning.ratio;
        setWidth(image, width);
        image.style.height = `${height}px`;
        positioning.currentHeight = height;
        positioning.currentWidth = width;
      } else if (isVertical) {
        let diff = Math.floor(positioning.startY - event.clientY);
        diff = positioning.direction & Direction.south ? -diff : diff;

        const height = clamp(positioning.startHeight + diff, minHeight, maxHeightContainer);

        image.style.height = `${height}px`;
        positioning.currentHeight = height;
      } else {
        let diff = Math.floor(positioning.startX - event.clientX);
        diff = positioning.direction & Direction.east ? -diff : diff;

        const width = clamp(positioning.startWidth + diff, minWidth, maxWidthContainer);
        setWidth(image, width);

        positioning.currentWidth = width;
      }
    }
  };

  const handlePointerUp = () => {
    const image = imageRef.current;
    const positioning = positioningRef.current;
    const controlWrapper = controlWrapperRef.current;
    if (image !== null && controlWrapper !== null && positioning.isResizing) {
      const width = positioning.currentWidth;
      const height = positioning.currentHeight;
      positioning.startWidth = 0;
      positioning.startHeight = 0;
      positioning.ratio = 0;
      positioning.startX = 0;
      positioning.startY = 0;
      positioning.currentWidth = 0;
      positioning.currentHeight = 0;
      positioning.isResizing = false;

      controlWrapper.classList.remove('image-control-wrapper--resizing');

      setEndCursor();
      onResizeEnd(width, height);

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    }
  };

  return (
    <div ref={controlWrapperRef}>
      <ImageResizerPoint
        direction="north"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north);
        }}
      />
      <ImageResizerPoint
        direction="northeast"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.east);
        }}
      />
      <ImageResizerPoint
        direction="east"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.east);
        }}
      />
      <ImageResizerPoint
        direction="southeast"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.east);
        }}
      />
      <ImageResizerPoint
        direction="south"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south);
        }}
      />
      <ImageResizerPoint
        direction="southwest"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.south | Direction.west);
        }}
      />
      <ImageResizerPoint
        direction="west"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.west);
        }}
      />
      <ImageResizerPoint
        direction="northwest"
        onPointerDown={(event) => {
          handlePointerDown(event, Direction.north | Direction.west);
        }}
      />
    </div>
  );
}
