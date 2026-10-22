import React from 'react';
import { styled } from '../../styles/stitches.config';
import { Col, Row } from '../Flex/Flex';
import { ColorType, defaultColorType, Square, StyledColorHelper } from './colorHelperLib';
import { CSSProperties } from '@stitches/react';

const StyledRow = styled(Row, {
  padding: '$sm',
  border: '1px solid $black',
});

type BgType = 'dark' | 'light' | 'default' | 'image';

const getSquareBg = (type: BgType, color: CSSProperties['color']) => {
  if (type === 'dark') {
    return '$navbarBackground';
  } else if (type === 'light') {
    return '$pageBackground';
  }
  return color;
};

interface ColorHelperProps {
  colors: ColorType[];
  bg?: BgType;
}

const ColorHelper: React.FC<ColorHelperProps> = ({
  colors = [defaultColorType],
  bg = 'default',
}) => {
  const [hoveredColor, setHoveredColor] = React.useState<ColorType>(colors[0] || defaultColorType);

  return (
    <Row gap="sm">
      <Square
        imageBg={bg === 'image'}
        css={{ backgroundColor: getSquareBg(bg, hoveredColor.c), color: hoveredColor.t }}
      >
        {bg === 'image' ? (
          <Square
            inside
            css={{ backgroundColor: getSquareBg(bg, hoveredColor.c), color: hoveredColor.t }}
          >
            {hoveredColor.c}
          </Square>
        ) : (
          hoveredColor.c
        )}
      </Square>
      <Col gap="sm">
        <StyledRow css={{ backgroundColor: hoveredColor.c, color: hoveredColor.t }}>
          Background of chosen color.
        </StyledRow>
        <StyledRow css={{ backgroundColor: '$white', color: hoveredColor.c }}>
          White background with text of chosen color.
        </StyledRow>
        <StyledRow css={{ backgroundColor: '$navbarBackground', color: hoveredColor.c }}>
          Dark background with text of chosen color.
        </StyledRow>
        <Row gap="sm">
          {colors.map((color) => (
            <StyledColorHelper
              key={color.c}
              onMouseEnter={() => setHoveredColor(color)}
              css={{ backgroundColor: color.c }}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ColorHelper;
