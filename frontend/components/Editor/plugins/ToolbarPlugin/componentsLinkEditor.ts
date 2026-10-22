import { styled } from '../../../../styles/stitches.config';

export const LinkEditor = styled('div', {
  position: 'absolute',
  zIndex: 100,
  top: '-10000px',
  left: '-10000px',
  marginTop: '-6px',
  maxWidth: '300px',
  width: '100%',
  opacity: 0,
  backgroundColor: '#fff',
  boxShadow: '0 5px 10px rgba(0, 0, 0, 0.3)',
  borderRadius: '8px',
  transition: 'opacity 0.5s',
});

export const LinkEditorInput = styled('input', {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: '2.5rem',
  boxSizing: 'border-box',
  margin: '0.5rem 0.5rem',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.5rem',
  backgroundColor: '#eee',
  fontSize: '1rem',
  color: 'rgb(5, 5, 5)',
  border: '0',
  outline: '0',
  position: 'relative',
  fontFamily: 'inherit',
});

export const LinkEditorDiv = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 'calc(100% - 1rem)',
  height: '2.5rem',
  boxSizing: 'border-box',
  margin: '0.5rem 0.5rem',
  padding: '0.25rem 0.25rem 0.25rem 0.5rem',
  borderRadius: '0.5rem',
  backgroundColor: '#eee',
  fontSize: '1rem',
  color: 'rgb(5, 5, 5)',
  border: '0',
  outline: '0',
  position: 'relative',
  fontFamily: 'inherit',
});

export const LinkEditorLink = styled('a', {
  color: 'rgb(33, 111, 219)',
  textDecoration: 'none',
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginRight: '30px',
  textOverflow: 'ellipsis',

  '&:hover': {
    textDecoration: 'underline',
  },
});

export const LinkEditIcon = styled('button', {
  display: 'flex',
  width: '2rem',
  height: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '$primary200',
  border: '1px solid $colors$primary200',
  cursor: 'pointer',
  padding: '0.25rem',
  borderRadius: '0.5rem',
  margin: '0',

  '&:hover': {
    backgroundColor: '$primary200',
  },
});
