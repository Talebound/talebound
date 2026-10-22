import { styled } from '../../../styles/stitches.config';
import { Row } from '../../../components/Flex/Flex';

const BREAKPOINT = 866;
const BREAKPOINT_SMALL = 553;

export const MENU_ADMINISTRATION_BREAKPOINT_MAX = `@media (max-width: ${BREAKPOINT}px)`; // inputs are wrapper
export const MENU_ADMINISTRATION_BREAKPOINT_MIN = `@media (min-width: ${BREAKPOINT + 1}px)`; // inputs are wrapper
export const MENU_ADMINISTRATION_BREAKPOINT_SMALL = `@media (max-width: ${BREAKPOINT_SMALL}px)`; // navbar component is wrapped

export const NavbarWrapper = styled('div', {
  width: '$navbarWidth',
  backgroundColor: '$navbarBackground',
  padding: '0.25rem',
  transition: 'opacity 0.2s ease-in-out',

  [MENU_ADMINISTRATION_BREAKPOINT_SMALL]: {
    marginLeft: '35px',
  },

  variants: {
    main: {
      true: {
        padding: '0rem',
      },
    },
  },
});

export const InputWrapper = styled('div', {
  width: '142px',
  padding: '0.25rem',

  [MENU_ADMINISTRATION_BREAKPOINT_MAX]: {
    marginLeft: '32px',
  },
});

export const Item = styled(Row, {
  marginTop: '-2px',
  userSelect: 'none',
  transition: 'opacity 0.3s ease-in-out',
  zIndex: 1,

  '&:hover': {
    backgroundColor: '$white',
    zIndex: 0,
  },

  [MENU_ADMINISTRATION_BREAKPOINT_MAX]: {
    margin: '0.5rem',
    padding: '1rem',
    boxShadow: '$sm',
    border: '1px solid $primary200',
  },

  variants: {
    dragging: {
      true: {
        opacity: 0.5,
        outline: '2px solid $primary200',
      },
    },
  },
});

export const DragHandle = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem',
  cursor: 'grab',
  width: '32px',

  variants: {
    dragging: {
      true: {
        cursor: 'grabbing',
      },
    },
  },
});
