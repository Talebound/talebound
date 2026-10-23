import React, { useCallback, useMemo } from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard, { ImageCardPropsExtended, ImageCardStatSection } from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_SYSTEM_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useSystem } from '../../hooks/useSystem';

export const getSystemStatSections = (
  characterCount: number,
  questCount: number,
  activityCount: number,
): ImageCardStatSection[] => [
  { label: 'Characters', value: characterCount },
  { label: 'Quests', value: questCount },
  { label: 'Activity', value: activityCount },
];

interface SystemCardProps extends ImageCardPropsExtended {
  systemId: number;
  onSystemSelected?: (id: number) => void;
}

const SystemCard: React.FC<SystemCardProps> = ({
  systemId,
  onSystemSelected,
  onClick,
  ...extended
}) => {
  const { system, module } = useSystem(systemId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_SYSTEM,
  });

  const statSections = useMemo(() => getSystemStatSections(0, 0, 0), []);
  const onSelected = useCallback(
    () => (onSystemSelected ? onSystemSelected(systemId) : undefined),
    [onSystemSelected, systemId],
  );

  if (!system) return null;

  return (
    <ImageCard
      key={system.id}
      title={system.name ?? '- Unknown -'}
      basedOn={system.basedOn ?? ''}
      statSections={statSections}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_SYSTEM_THUMBNAIL}
      href={`/systems/${system.id}/detail`}
      availableTags={availableTags}
      tags={module?.tags}
      onClick={onClick ?? onSelected}
      {...extended}
    />
  );
};

export default SystemCard;
