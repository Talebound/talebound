import React from 'react';
import { CSSProperties } from '@stitches/react';
import { styled } from '../../styles/stitches.config';

const StyledLogo = styled('img', {});

interface LogoProps {
  size: CSSProperties['width'];
}

const Logo: React.FC<LogoProps> = ({ size }) => {
  return (
    <StyledLogo
      css={{ width: size, height: size }}
      src="/assets/logo/logo-v1.png"
      alt="Talebound Logo"
    />
  );
};

export default Logo;
