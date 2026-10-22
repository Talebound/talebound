import { styled } from '../../../../styles/stitches.config';

//<div className="table-cell-action-button-container" ref={menuButtonRef}>

export const TableCellActionButtonContainer = styled('div', {
  position: 'absolute',
  top: '0',
  left: '0',
  willChange: 'transform',
});

export const TableCellActionButton = styled('div', {
  backgroundColor: '$primary200',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0',
  position: 'relative',
  borderRadius: '15px',
  color: '#222',
  cursor: 'pointer',
  width: '16px',
  height: '16px',

  '&:hover': {
    backgroundColor: '$primary300',
  },
});
