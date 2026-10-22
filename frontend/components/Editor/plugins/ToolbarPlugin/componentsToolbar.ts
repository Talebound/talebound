import { styled } from '../../../../styles/stitches.config';

export const ToolbarItemButton = styled('button', {
  border: '0',
  display: 'flex',
  borderRadius: '10px',
  padding: '8px',
  cursor: 'pointer',
  verticalAlign: 'middle',
  fontSize: '18px',
  gap: '0.25rem',
  backgroundColor: '#fff',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&:hover:not(:disabled)': {
    backgroundColor: '#eee',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$primary200',
      },
    },
  },
});

export const Divider = styled('div', {
  width: '1px',
  backgroundColor: '#eee',
  display: 'inline-block',
});

export const Toolbar = styled('div', {
  position: 'sticky',
  top: '0',
  display: 'flex',
  flexWrap: 'wrap',
  marginBottom: '1px',
  background: '$white300',
  padding: '4px',
  borderBottom: '1px solid $white900',
  verticalAlign: 'middle',
  gap: '2px',
  zIndex: 2,
});

export const ToolbarSelect = styled('select', {
  border: '0',
  display: 'flex',
  background: 'none',
  borderRadius: '10px',
  padding: '8px',
  verticalAlign: 'middle',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  width: '70px',
  fontSize: '14px',
  color: '#777',
  textOverflow: 'ellipsis',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '#eee',
  },

  '&:focus': {
    outline: 'none',
  },
});
