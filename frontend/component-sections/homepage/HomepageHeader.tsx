import React from 'react';
import Login from './Login';
import { styled } from '../../styles/stitches.config';

const Header = styled('div', {
  width: '100%',
  height: '430px',
  backgroundImage:
    'url("https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/efaae215-d5c5-4070-e61d-949f10521200/original")',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  position: 'relative',
});

const HeaderHeading = styled('h1', {
  margin: '0',
  position: 'absolute',
  fontSize: '10rem',
  left: '50%',
  bottom: '$0',
  transform: 'translate(-50%, 0%)',
  fontFamily: '$decorative',
  textShadow: '1px 1px 4px rgba(255, 255, 255, 0.2)',
  transition: 'text-shadow 0.3s ease-in-out',
  backgroundImage: '$gradientDark',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline',
  padding: '$0 $8',

  '@smMax': {
    fontSize: 'max(115px,calc(100vw / 8))',
    bottom: '$10',
    left: 'calc((100vw - 200px) / 2)',
  },

  '@media (max-width: 600px)': {
    top: '$17',
    left: '50%',
  },

  '@media (max-width: 400px)': {
    fontSize: '96px',
    top: '$20',
  },

  '&:hover': {
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
  },
});

const HeaderSubheading = styled('h2', {
  fontFamily: '$heading',
  margin: '0',
  position: 'absolute',
  left: '50%',
  bottom: '$8',
  transform: 'translate(-50%, 0%)',
  textShadow: '1px 1px 4px rgba(255, 255, 255, 0.2)',
  textTransform: 'uppercase',
  color: '$primary700',
  fontSize: '$xl',
  backgroundImage: '$gradientDark',
  backgroundClip: 'text',
  display: 'inline',

  '@smMax': {
    fontSize: 'max(15px, calc(100vw / 45))', //15
    bottom: '$12',
    left: 'calc((100vw - 200px) / 2)',
  },

  '@media (max-width: 600px)': {
    top: '$48',
    left: '0',
    right: '0',
    textAlign: 'center',
    transform: 'translate(0%, 0%)',
  },

  '@media (max-width: 400px)': {
    fontSize: '14px',
    top: '$48',
  },
});

const HomepageHeader: React.FC = () => {
  return (
    <Header>
      <HeaderHeading>Talebound</HeaderHeading>
      <HeaderSubheading>the ultimate text-based adventure platform</HeaderSubheading>
      <Login />
    </Header>
  );
};

export default HomepageHeader;
