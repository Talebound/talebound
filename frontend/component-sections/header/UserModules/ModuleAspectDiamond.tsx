import React from 'react';
import AspectDiamond from '../ControlPanel/AspectDiamond';
import { store } from '../../../store';
import { imageSelectors } from '../../../adapters/ImageAdapter';
import { useModuleExtended } from '../../../hooks/useModuleExtended';
import { AspectDiamondX, AspectDiamondY } from '../ControlPanel/utilsAspectDiamond';

interface ModuleAspectDiamondProps {
  moduleId: number;
  totalCount: number;
  index: number;
  x: AspectDiamondX;
  y: AspectDiamondY;
}

const ModuleAspectDiamond: React.FC<ModuleAspectDiamondProps> = ({
  moduleId,
  totalCount,
  index,
  x,
  y,
}) => {
  const moduleExtended = useModuleExtended(moduleId);

  const avatar = imageSelectors.selectById(
    store.getState(),
    moduleExtended.module?.avatarImgId ?? 0,
  );

  if (!moduleExtended) {
    return null;
  }

  return (
    <AspectDiamond
      key={moduleId}
      imgIdx={0}
      totalCount={totalCount}
      avatarUrl={avatar?.url}
      linkUrl={`/${moduleExtended.urlPart}/${moduleExtended.moduleTypeId}/detail`}
      name={moduleExtended.name}
      entityId={moduleExtended.moduleTypeId}
      index={index}
      x={x}
      y={y}
    />
  );
};

export default ModuleAspectDiamond;
