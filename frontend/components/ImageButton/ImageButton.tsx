import React from 'react';
import { styled } from '../../styles/stitches.config';
import { Col } from '../Flex/Flex';

const ImageBackground = styled(Col, {
  flexGrow: 1,
  width: '175px',
  height: '125px',
  borderRadius: '$lg',
  backgroundSize: 'cover',
  cursor: 'pointer',

  variants: {
    active: {
      true: {},
    },
  },
});

export const ImageButtonTitle = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative',
  bottom: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  padding: '$md',
  backgroundColor: '$transparent0',
  color: '$white',
  fontSize: '$3xl',
  fontFamily: '$decorative',
  transition: '0.3s all',
  textShadow:
    '0 0 30px #001100,0 0 40px #001100, 0 0 50px #001100, 0 0 60px #001100, 0 0 70px #001100',

  '&:hover': {
    backgroundColor: '$transparent40',
    fontSize: '$4xl',
    textShadow:
      '0 0 50px #001100,0 0 60px #001100, 0 0 70px #001100, 0 0 80px #001100, 0 0 90px #001100',
  },

  variants: {
    active: {
      true: {
        backgroundColor: '$transparent30',
        fontSize: '$3xl',
        paddingTop: '$2xl',
      },
    },
  },
});

interface ImageButtonProps {
  title: string;
  imgUrl: string;
  onClick?: () => void;
  active?: boolean;
}

const ImageButton: React.FC<ImageButtonProps> = ({ title, imgUrl, onClick, active = false }) => {
  return (
    <ImageBackground
      active={active}
      onClick={onClick}
      css={{
        backgroundImage: `url(${imgUrl})`,
      }}
    >
      <ImageButtonTitle active={active}>{title}</ImageButtonTitle>
    </ImageBackground>
  );
};

export default ImageButton;
