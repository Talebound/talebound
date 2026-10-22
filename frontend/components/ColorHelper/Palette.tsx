import React from 'react';
import { ColorType, defaultColorType, Square, StyledColorHelper } from './colorHelperLib';
import { Col, Row } from '../Flex/Flex';

interface PaletteProps {
  colors: Array<ColorType[]>;
}

export const Palette: React.FC<PaletteProps> = ({ colors = [[defaultColorType]] }) => {
  const [hoveredColor, setHoveredColor] = React.useState<ColorType>(
    colors[0][0] || defaultColorType,
  );

  return (
    <Row gap="sm">
      <Col gap="sm">
        <Square css={{ backgroundColor: hoveredColor.c, color: hoveredColor.t }}>
          {hoveredColor.c}
        </Square>
        {hoveredColor.c}
      </Col>
      <Col gap="sm">
        {colors.map((colorArray) => (
          <Row gap="sm" key={colorArray[0].c}>
            {colorArray.map((color) => (
              <StyledColorHelper
                key={color.c}
                onMouseEnter={() => setHoveredColor(color)}
                css={{ backgroundColor: color.c }}
              />
            ))}
          </Row>
        ))}
      </Col>
    </Row>
  );
};
