import { styled } from '../../../../styles/stitches.config';

export const DraggableBlock = styled('div', {
  borderRadius: '4px',
  padding: '2px 1px',
  cursor: 'grab',
  opacity: '0',
  position: 'absolute',
  left: '0',
  top: '0',
  willChange: 'transform',
  zIndex: 200,

  '&:active': {
    cursor: 'grabbing',
  },

  '&:hover': {
    backgroundColor: '#efefef',
  },
});

export const DraggableBlockIcon = styled('div', {
  width: '16px',
  height: '16px',
  opacity: '0.3',
  userSelect: 'none',
  pointerEvents: 'none',
});

export const DraggableBlockTargetLine = styled('div', {
  pointerEvents: 'none',
  background: 'deepskyblue',
  height: '4px',
  position: 'absolute',
  left: '0',
  top: '0',
  opacity: '0',
  willChange: 'transform',
});
