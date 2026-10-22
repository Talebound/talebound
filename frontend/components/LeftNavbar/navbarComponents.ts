import { styled } from '../../styles/stitches.config';
import { default as NextLink } from 'next/link';

export const NavbarWrapper = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  width: '$navbarWidth',
  minWidth: '$navbarWidth',
  flexGrow: 0,
  backgroundColor: '$navbarBackground',
  gap: '$sm',
  opacity: 1,
  zIndex: 2,

  transition: 'all 0.3s ease-in-out',

  '@media (max-width: 1066px)': {
    transform: 'translateX(calc(-100% + 50px))',
    marginRight: '-200px',

    '&:hover, &:focus-within': {
      transform: 'translateX(0)',
      // marginRight: '0',
    },
  },
});

export const NavbarSquare = styled('div', {
  margin: '0.25rem',
  width: '1.25rem',
  height: '1.25rem',
  borderRadius: '0',
  backgroundColor: '$black',
  border: '2px solid $primary200',
  transition: 'all 0.3s ease-in-out',
  transform: 'rotate(45deg)',
});

export const NavbarItem = styled(NextLink, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$md',
  padding: '$xs',
  marginLeft: '$sm',
  marginRight: '$sm',
  color: '$primary200',
  borderRadius: '$md',
  transition: 'all 0.3s ease-in-out',
  textDecoration: 'none',

  '&:hover': {
    backgroundColor: '#3e4747',
    paddingLeft: '$md',

    [`& ${NavbarSquare}`]: {
      backgroundColor: '$primary200',
      // transform: 'rotate(45deg) translate(0.25rem, -0.25rem)',
    },
  },

  variants: {
    active: {
      true: {
        backgroundColor: '#3e4747',
        fontWeight: '$bold',
        opacity: 0.9,
        paddingLeft: '$lg',

        [`& ${NavbarSquare}`]: {
          backgroundColor: '$primary200',
        },
      },
    },
  },
});
