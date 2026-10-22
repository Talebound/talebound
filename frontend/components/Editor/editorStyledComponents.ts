import { styled } from '../../styles/stitches.config';

export const EditorScroller = styled('div', {
  border: '0',
  display: 'flex',
  position: 'relative',
  outline: '0',
  zIndex: '0',
  overflow: 'auto',

  variants: {
    editable: {
      true: {
        minHeight: '150px',
        resize: 'vertical',
      },
      false: {
        resize: 'none',
      },
    },
  },
});

export const EditorWrapper = styled('div', {
  flex: 'auto',
  position: 'relative',

  variants: {
    editable: {
      true: {
        resize: 'vertical',
      },
      false: {
        resize: 'none',
      },
    },
  },
});

export const EditorContainer = styled('div', {
  display: 'flex',
  position: 'relative',
  border: '1px solid $white900',
  flexDirection: 'column',
  flexGrow: 1,
  alignSelf: 'stretch',
  color: '#000',
  lineHeight: '20px',
  fontWeight: 400,
  textAlign: 'left',

  variants: {
    postView: {
      true: {
        border: '0',
      },
    },
    loading: {
      true: {
        opacity: 0.7,
      },
    },
  },
});

export const EditorInner = styled('div', {
  // background: '$white100',
  background: 'transparent',
  position: 'relative',
  height: '100%',

  '& hr': {
    border: '1px solid $primary200',
    backgroundColor: '$primary200',
    height: '1px',
    borderRadius: '5px',
    marginTop: '10px',
    marginBottom: '5px',
  },

  '& .other h2': {
    // fontSize: '18px',
    color: '$primary800',
    marginBottom: '7px',
  },

  '& .other a': {
    color: '#777',
    textDecoration: 'underline',
    fontSize: '14px',
  },

  '& .other ul': {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
  },

  '& h1': {
    // fontSize: '24px',
    color: '$primary800',
  },

  '& .ltr ': {
    textAlign: 'left',
  },

  '& .rtl': {
    textAlign: 'right',
  },

  '& .editor-input': {
    minHeight: '250px',
    height: '100%',
    resize: 'none',
    fontSize: '1rem',
    position: 'relative',
    tabSize: '2',
    outline: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    paddingLeft: '24px',
    paddingRight: '8px',
    caretColor: '#444',
  },

  '& .editor-text-bold ': {
    fontWeight: 'bold',
  },

  '& .editor-text-italic ': {
    fontStyle: 'italic',
  },

  '& .editor-text-underline': {
    textDecoration: 'underline',
  },

  '& .editor-text-strikethrough': {
    textDecoration: 'line-through',
  },

  '& .editor-text-underlineStrikethrough': {
    textDecoration: 'underline line-through',
  },

  '& .editor-text-code': {
    backgroundColor: 'rgb(240, 242, 245)',
    padding: '1px 0.25rem',
    fontFamily: 'Menlo, Consolas, Monaco, monospace',
    fontSize: '94%',
  },

  '& .editor-link': {
    color: 'rgb(33, 111, 219)',
    textDecoration: 'none',
  },

  '& .editor-code': {
    backgroundColor: 'rgb(240, 242, 245)',
    fontFamily: 'Menlo, Consolas, Monaco, monospace',
    display: 'block',
    padding: '8px 8px 8px 52px',
    lineHeight: '1.53',
    fontSize: '13px',
    margin: '8px 0',
    tabSize: '2',
    /* white-space: pre; */
    overflowX: 'auto',
    position: 'relative',
  },

  '& .editor-code:before': {
    content: 'attr(data-gutter)',
    position: 'absolute',
    backgroundColor: '#eee',
    left: '0',
    top: '0',
    borderRight: '1px solid #ccc',
    padding: '8px',
    color: '#777',
    whiteSpace: 'pre-wrap',
    textAlign: 'right',
    minWidth: '25px',
  },

  '& .editor-code:after': {
    content: 'attr(data-highlight-language)',
    top: '0',
    right: '3px',
    padding: '3px',
    fontSize: '10px',
    textTransform: 'uppercase',
    position: 'absolute',
    color: 'rgba(0, 0, 0, 0.5)',
  },

  '& .editor-tokenComment': {
    color: 'slategray',
  },

  '& .editor-tokenPunctuation ': {
    color: '#999',
  },

  '& .editor-tokenProperty': {
    color: '#905',
  },

  '& .editor-tokenSelector': {
    color: '#690',
  },

  '& .editor-tokenOperator': {
    color: '#9a6e3a',
  },

  '& .editor-tokenAttr': {
    color: '#07a',
  },

  '& .editor-tokenVariable': {
    color: '#e90',
  },

  '& .editor-tokenFunction': {
    color: '#dd4a68',
  },

  '& .editor-paragraph': {
    margin: '0 0 8px',
    position: 'relative',
  },

  '& .editor-paragraph:last-child': {
    marginBottom: '0',
  },

  '& .editor-heading-h1': {
    color: '$primary800',
    fontSize: '$xl',
    margin: '0 0 12px',
    padding: '0',
  },

  '& .editor-heading-h2': {
    color: '$primary800',
    fontSize: '$md',
    textDecoration: 'underline',
    margin: '10px 0 0',
    padding: '0',
  },

  '& .editor-quote': {
    margin: '0 0 0 20px',
    fontSize: '15px',
    color: 'rgb(101, 103, 107)',
    borderLeftColor: 'rgb(206, 208, 212)',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    paddingLeft: '16px',
  },

  '& .editor-list-ol': {
    padding: 0,
    margin: '0 0 0 16px',
  },

  '& .editor-list-ul': {
    padding: 0,
    margin: '0 0 0 16px',
  },

  '& .inline-editor-image': {
    cursor: 'default',
    display: 'inline-block',
    position: 'relative',
    zIndex: '1',
    marginBottom: '$sm',

    '&.position-left': {
      float: 'left',
      marginRight: '$sm',
    },
    '&.position-right': {
      float: 'right',
      marginLeft: '$sm',
    },
    '&.position-full': {
      marginLeft: '$sm',
      width: '100%',
    },
  },

  '& .editor-listitem': {
    margin: '8px 32px 8px 32px',
  },

  '& .editor-nested-listitem': {
    listStyleType: 'none',
  },

  '& pre::-webkit-scrollbar': {
    background: 'transparent',
    width: '10px',
  },

  '& pre::-webkit-scrollbar-thumb': {
    background: '#999',
  },

  '& span[data-info="image-node"]': {
    fontWeight: '400',
  },

  '& .editor-table-selection *::selection': {
    backgroundColor: 'transparent',
  },

  '& .editor-table': {
    borderCollapse: 'collapse',
    borderSpacing: '0',
    overflowY: 'scroll',
    overflowX: 'scroll',
    tableLayout: 'fixed',
    width: 'max-content',
    margin: '30px 0',

    '& .editor-tableSelected': {
      outline: '2px solid $primary',
    },

    '& .editor-tableCell': {
      border: '1px solid $primary900',
      width: '75px',
      minWidth: '75px',
      verticalAlign: 'top',
      textAlign: 'start',
      padding: '6px 8px',
      position: 'relative',
      outline: 'none',
    },

    '& .editor-tableCellSortedIndicator': {
      display: 'block',
      opacity: '0.5',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: '4px',
      backgroundColor: '#999',
    },
    '& .editor-tableCellResizer': {
      position: 'absolute',
      right: '-4px',
      height: '100%',
      width: '8px',
      cursor: 'ew-resize',
      zIndex: '10',
      top: '0',
    },
    '& .editor-tableCellHeader': {
      backgroundColor: '$primary200',
      textAlign: 'start',
    },
    '& .editor-tableCellSelected': {
      backgroundColor: '#c9dbf0',
    },
    '& .editor-tableCellPrimarySelected': {
      border: '2px solid $primary',
      display: 'block',
      height: 'calc(100% - 2px)',
      position: 'absolute',
      width: 'calc(100% - 2px)',
      left: '-1px',
      top: '-1px',
      zIndex: '2',
    },
    '& .editor-tableCellEditing': {
      boxShadow: '0 0 5px rgba(0, 0, 0, 0.4)',
      borderRadius: '3px',
    },
    '& .editor-tableAddColumns': {
      position: 'absolute',
      top: '0',
      width: '20px',
      backgroundColor: '#eee',
      height: '100%',
      right: '0',
      animation: 'table-controls 0.2s ease',
      border: '0',
      cursor: 'pointer',
    },
    '& .editor-tableAddColumns::after': {
      backgroundImage: 'url(../images/icons/plus.svg)',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'block',
      content: ' ',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: '0.4',
    },
    '& .editor-tableAddColumns::hover': {
      backgroundColor: '#c9dbf0',
    },
    '& .editor-tableAddRows': {
      position: 'absolute',
      bottom: '-25px',
      width: 'calc(100% - 25px)',
      backgroundColor: '#eee',
      height: '20px',
      left: '0',
      animation: 'table-controls 0.2s ease',
      border: '0',
      cursor: 'pointer',
    },
    '& .editor-tableAddRows:after': {
      backgroundImage:
        'url(https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/bbf5d630-1ad8-48a0-1971-214dfc18bd00/30x30)',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'block',
      content: ' ',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: '0.4',
    },
    '& .editor-tableAddRows:hover': {
      backgroundColor: '#c9dbf0',
    },
    '& .editor-tableCellResizeRuler': {
      display: 'block',
      position: 'absolute',
      width: '1px',
      backgroundColor: '$primary',
      height: '100%',
      top: '0',
    },
    '& .editor-tableCellActionButtonContainer': {
      display: 'block',
      right: '5px',
      top: '6px',
      position: 'absolute',
      zIndex: '4',
      width: '20px',
      height: '20px',
    },
    '& .editor-tableCellActionButton': {
      backgroundColor: '#eee',
      display: 'block',
      border: '0',
      borderRadius: '20px',
      width: '20px',
      height: '20px',
      color: '#222',
      cursor: 'pointer',
    },
    '& .editor-tableCellActionButton:hover': {
      backgroundColor: '#ddd',
    },
  },

  variants: {
    postView: {
      true: {
        '& .editor-input': {
          minHeight: '0px',
        },
      },
    },

    maxImageWidth: {
      600: {
        '& span[data-info="image-node"]': {
          maxWidth: '600px',
        },
      },
    },

    editable: {
      false: {
        '& .editor-input': {
          paddingLeft: '16px',
          paddingRight: '16px',
        },
      },
    },
  },

  defaultVariants: {
    maxImageWidth: '600',
  },
});

export const Placeholder = styled('div', {
  color: '#999',
  overflow: 'hidden',
  position: 'absolute',
  textOverflow: 'ellipsis',
  top: '15px',
  left: '10px',
  fontSize: '15px',
  userSelect: 'none',
  display: 'inline-block',
  pointerEvents: 'none',
});
