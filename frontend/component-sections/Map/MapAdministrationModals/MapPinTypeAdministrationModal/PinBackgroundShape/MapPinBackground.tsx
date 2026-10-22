import React from 'react';
import { PbPinShape } from '../../../../../generated/api-types/data-contracts';
import { SvgCloud } from './shapes/SvgCloud';
import { SvgCircle } from './shapes/SvgCircle';
import { SvgSquare } from './shapes/SvgSquare';
import { SvgTriangle } from './shapes/SvgTriangle';
import { SvgPin } from './shapes/SvgPin';
import { SvgHexagon } from './shapes/SvgHexagon';
import { SvgOctagon } from './shapes/SvgOctagon';
import { SvgStar } from './shapes/SvgStar';
import { SvgDiamond } from './shapes/SvgDiamond';
import { SvgPentagon } from './shapes/SvgPentagon';
import { SvgHeart } from './shapes/SvgHeart';

export interface MapPinBackgroundProps {
  shape: PbPinShape;
  width?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

const MapPinBackground: React.FC<MapPinBackgroundProps> = ({ shape, ...props }) => {
  if (!props.borderWidth) props.borderWidth = 2;

  switch (shape) {
    case PbPinShape.SQUARE:
      return <SvgSquare {...props} />;
    case PbPinShape.TRIANGLE:
      return <SvgTriangle {...props} />;
    case PbPinShape.PIN:
      return <SvgPin {...props} />;
    case PbPinShape.HEXAGON:
      return <SvgHexagon {...props} />;
    case PbPinShape.OCTAGON:
      return <SvgOctagon {...props} />;
    case PbPinShape.STAR:
      return <SvgStar {...props} />;
    case PbPinShape.DIAMOND:
      return <SvgDiamond {...props} />;
    case PbPinShape.PENTAGON:
      return <SvgPentagon {...props} />;
    case PbPinShape.HEART:
      return <SvgHeart {...props} />;
    case PbPinShape.CLOUD:
      return <SvgCloud {...props} />;
    case PbPinShape.CIRCLE:
      return <SvgCircle {...props} />;
  }
};

export default MapPinBackground;
