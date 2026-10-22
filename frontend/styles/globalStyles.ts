import { globalCss } from './stitches.config';

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },
  ':root': {
    fontSize: '16px',
  },
  html: {
    // backgroundImage: 'linear-gradient(to right top, #eafff9 0%, #fff2e8 100%)',
    backgroundColor: '$pageBackground',
  },
  body: {
    fontFamily: '$text',
    // scrollbarWidth: 'thin' /* Adjust the width of the scrollbar */,
    // scrollbarColor: '#888 #f5f5f5' /* Format: scrollbar-color: thumb track */,
    height: '100%',
  },
  'h1,h2,h3,h4,h5,h6': {
    fontFamily: '$heading',
    margin: 0,
  },
  a: {
    textDecoration: 'none',
    color: '$primary',
    cursor: 'pointer',
  },
  '::-webkit-scrollbar': {
    width: '12px' /* Adjust the width of the scrollbar */,
    height: '12px' /* Adjust the height of the scrollbar */,
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#f5f5f5' /* Background color of the scrollbar track */,
    borderRadius: '10px' /* Optional: Add border-radius to the scrollbar track */,
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#888' /* Background color of the scrollbar thumb */,
    borderRadius: '10px' /* Optional: Add border-radius to the scrollbar thumb */,
  },
  '::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555' /* Change color of the scrollbar thumb on hover */,
  },
});

export default globalStyles;
