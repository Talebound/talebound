import { styled } from '../../styles/stitches.config';

export const HeaderTransparentSection = styled('div', {
  position: 'absolute',
  backgroundColor: '$transparent40',
  top: 0,
  bottom: 0,
  paddingTop: 'calc(50px + $sm)',
  paddingBottom: '$md',
  paddingLeft: '$md',
  paddingRight: '$md',
  display: 'flex',
  gap: '$xs',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',

  ['span']: {
    // fontSize: '$lg',
    // fontWeight: '$bold',
  },

  variants: {
    position: {
      left: {
        left: 0,
        width: '250px',
      },
      right: {
        right: 0,
        width: 'min(600px, calc(100% - 250px))',
      },
    },
  },
});
