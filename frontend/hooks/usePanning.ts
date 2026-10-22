import React, { useCallback, useEffect, useRef } from 'react';

interface DimensionData {
  client: number;
  offset: number;
  startOffset: number;
  start: number;
  size: number;
  baseSize: number;
}

const checkLimits = (d: DimensionData, zoomRatio: number) => {
  const limit = -d.baseSize + d.size / zoomRatio;
  if (d.offset > 0) d.offset = 0;
  if (d.offset < limit) d.offset = limit;
};

const computeZoomPanOffsets = (
  d: DimensionData,
  x: number,
  newZoomRatio: number,
  oldZoomRatio: number,
) => {
  const pX = (d.client - x) / d.size;
  const widthDiff = d.size / newZoomRatio - d.size / oldZoomRatio;
  d.offset += widthDiff * pX;
  d.startOffset = d.offset;
};

const computeNewOffset = (d: DimensionData, zoomRatio: number) => {
  d.offset = d.startOffset + (d.client - d.start) / zoomRatio;
};

const hasSizes = (d: UsePanningResponse) => d.x.baseSize && d.y.baseSize && d.x.size && d.y.size;

export interface UsePanningResponse {
  isPanning: boolean;
  x: DimensionData;
  y: DimensionData;
  zoomRatio: number;
}

export interface UsePanningProps {
  ref: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  zoomRatio?: number;
  baseWidth: number;
  baseHeight: number;
  width: number;
  height: number;
}

export const usePanning = ({
  ref,
  contentRef,
  zoomRatio,
  baseWidth,
  baseHeight,
  width,
  height,
}: UsePanningProps): React.MutableRefObject<UsePanningResponse> => {
  const data = useRef<UsePanningResponse>({
    isPanning: false,
    x: {
      client: 0,
      offset: 0,
      startOffset: 0,
      start: 0,
      size: width,
      baseSize: baseWidth,
    },
    y: {
      client: 0,
      offset: 0,
      startOffset: 0,
      start: 0,
      size: height,
      baseSize: baseHeight,
    },
    zoomRatio: zoomRatio ?? 1,
  });

  const checkEdgesAndMove = useCallback(() => {
    if (!contentRef.current || !data.current || !hasSizes(data.current)) return;

    checkLimits(data.current.x, data.current.zoomRatio);
    checkLimits(data.current.y, data.current.zoomRatio);

    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${data.current.x.offset}px, ${data.current.y.offset}px)`;
    }
  }, [contentRef]);

  useEffect(() => {
    if (!ref.current || !data.current || !hasSizes(data.current)) return;

    const { left, top } = ref.current.getClientRects()[0];
    const zr = zoomRatio ?? 1;
    computeZoomPanOffsets(data.current.x, left, zr, data.current.zoomRatio);
    computeZoomPanOffsets(data.current.y, top, zr, data.current.zoomRatio);
    data.current.zoomRatio = zr;

    checkEdgesAndMove();
  }, [zoomRatio, checkEdgesAndMove, ref]);

  useEffect(() => {
    if (width) data.current.x.size = width;
    if (height) data.current.y.size = height;
    if (baseWidth) data.current.x.baseSize = baseWidth;
    if (baseHeight) data.current.y.baseSize = baseHeight;
    checkEdgesAndMove();
  }, [baseWidth, baseHeight, checkEdgesAndMove, width, height]);

  const handleMouseDown = useCallback((e: PointerEvent) => {
    data.current.isPanning = true;
    data.current.x.start = e.clientX;
    data.current.y.start = e.clientY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: PointerEvent) => {
      data.current.x.client = e.clientX;
      data.current.y.client = e.clientY;

      if (!data.current.isPanning) return;
      computeNewOffset(data.current.x, data.current.zoomRatio);
      computeNewOffset(data.current.y, data.current.zoomRatio);
      checkEdgesAndMove();
      e.preventDefault();
    },
    [checkEdgesAndMove],
  );

  const handleMouseUp = useCallback((e: PointerEvent) => {
    if (!data.current.isPanning) return;
    data.current.isPanning = false;
    data.current.x.startOffset = data.current.x.offset;
    data.current.y.startOffset = data.current.y.offset;
    e.preventDefault();
  }, []);

  useEffect(() => {
    const layoutElement = ref.current;

    if (layoutElement) {
      layoutElement.addEventListener('pointerdown', handleMouseDown);
      window.addEventListener('pointermove', handleMouseMove);
      window.addEventListener('pointerup', handleMouseUp);
    }

    return () => {
      if (layoutElement) {
        layoutElement.removeEventListener('pointerdown', handleMouseDown);
      }
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('pointerup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, ref]);

  return data;
};
