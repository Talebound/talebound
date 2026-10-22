export const stylesDropdownMenuItem = {
  all: 'unset',
  fontSize: 16,
  lineHeight: 1,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 36,
  padding: '0 5px',
  paddingRight: 16,
  position: 'relative',
  userSelect: 'none',

  variants: {
    color: {
      default: {
        color: '$primary800',

        '&[data-highlighted]': {
          backgroundColor: '$primary200',
          color: '$primary700',
        },
      },
      primary: {
        color: '$primary800',

        '&[data-highlighted]': {
          backgroundColor: '$primary700',
          color: '$primary200',
        },
      },
      danger: {
        color: '$danger800',

        '&[data-highlighted]': {
          backgroundColor: '$danger800',
          color: '$danger800',
        },
      },
    },

    active: {
      true: {
        backgroundColor: '$primary200',
      },
    },

    padding: {
      default: {
        paddingLeft: 25,
      },
      sm: {
        paddingLeft: '$md',
      },
      lg: {
        paddingLeft: '$xl',
      },
    },
  },

  defaultVariants: {
    color: 'default',
    padding: 'default',
  },

  '&[data-disabled]': {
    color: '$primary200',
    pointerEvents: 'none',
  },
};
