import React from 'react';
import { AspectDiamondWrapper } from './AspectDiamondWrapper';
import { AspectDiamondIcon } from './AspectDiamondIcon';
import {
  ASPECT_DIAMOND_TEMP_IMAGES,
  AspectDiamondX,
  AspectDiamondY,
  getAspectDiamondPosition,
} from './utilsAspectDiamond';
import { AspectDiamondText } from './AspectDiamondText';
import { ModuleData } from './utilsAspectBox';
import Link from 'next/link';

type MarkerType = ModuleData['marker'][number];

interface AspectDiamondProps extends MarkerType {
  text?: string;
  index: number;
  totalCount: number;
  x: AspectDiamondX;
  y: AspectDiamondY;
}

const AspectDiamond: React.FC<AspectDiamondProps> = ({
  imgIdx = 0,
  text,
  index,
  totalCount,
  x,
  y,
  avatarUrl,
  linkUrl,
  name,
  entityId,
}) => {
  return (
    <AspectDiamondWrapper
      large={totalCount === 1}
      x={x}
      y={y}
      position={getAspectDiamondPosition(index, totalCount, x, y)}
      text={!!text}
    >
      {!text && (
        <Link href={linkUrl ?? `/worlds`}>
          <AspectDiamondIcon
            large={totalCount === 1}
            src={avatarUrl ?? ASPECT_DIAMOND_TEMP_IMAGES[imgIdx]}
            alt={'Marker'}
            title={`${name} #${entityId}`}
          />
        </Link>
      )}
      {text && <AspectDiamondText>{text}</AspectDiamondText>}
    </AspectDiamondWrapper>
  );
};

export default AspectDiamond;
