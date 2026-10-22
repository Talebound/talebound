import { styled } from '../../styles/stitches.config';

export const HeaderNavigation = styled('nav', {
  position: 'absolute',
  width: '$fit',
  bottom: '$0',
  left: '$50',
  transform: 'translate(-50%, 0%)',
  padding: '$0',
  maskImage:
    'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%)',
  '& ul': {
    textAlign: 'center',
    background:
      'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 25%, rgba(255, 255, 255, 0.4) 75%, rgba(255, 255, 255, 0) 100%)',
    '& li': {
      display: 'inline-block',
      '& a': {
        display: 'block',
        padding: '$md',
        '&:hover': {
          boxShadow: '$focus',
          background: 'rgba(255, 255, 255, 0.1)',
          color: '$primary700',
        },
      },
    },
  },
});
