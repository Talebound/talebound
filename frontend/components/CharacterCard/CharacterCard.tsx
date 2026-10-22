import React from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard, { ImageCardStatSection } from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_CHARACTER_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useCharacter } from '../../hooks/useCharacter';

export const getCharacterStatSections = (
  postCount: number,
  activityCount: number,
): ImageCardStatSection[] => [
  { label: 'Posts', value: postCount },
  { label: 'Activity', value: activityCount },
];

interface CharacterCardProps {
  characterId: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ characterId }) => {
  const { character, module } = useCharacter(characterId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_CHARACTER,
  });

  if (!character) return null;

  return (
    <ImageCard
      key={character.id}
      title={character.name ?? '- Unknown -'}
      basedOn={''}
      statSections={[]}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_CHARACTER_THUMBNAIL}
      href={`/characters/${character.id}/detail`}
      availableTags={availableTags}
      tags={module?.tags}
    />
  );
};

export default CharacterCard;
