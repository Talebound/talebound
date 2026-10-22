import React, { useMemo } from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import ImageCard, { ImageCardStatSection } from '../ImageCard/ImageCard';
import { IMAGE_DEFAULT_QUEST_THUMBNAIL } from '../../utils/images/imageDefaultUrls';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { store } from '../../store';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useQuest } from '../../hooks/useQuest';
import { Row } from '../Flex/Flex';
import QuestStatusButton from '../QuestStatusButton/QuestStatusButton';
import QuestCanJoinButton from '../QuestCanJoinButton/QuestCanJoinButton';

export const getQuestStatSections = (
  postCount: number,
  activityCount: number,
): ImageCardStatSection[] => [
  { label: 'Posts', value: postCount },
  { label: 'Activity', value: activityCount },
];

interface QuestCardProps {
  questId: number;
}

const QuestCard: React.FC<QuestCardProps> = ({ questId }) => {
  const { quest, module } = useQuest(questId);
  const imageThumbnail = imageSelectors.selectById(store.getState(), module?.thumbnailImgId ?? 0);

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_QUEST,
  });

  const statusBar = useMemo(() => {
    return (
      <Row gap="sm" fullWidth justifyContent="center">
        {quest?.status && <QuestStatusButton questStatus={quest.status} />}
        <QuestCanJoinButton canJoin={!!quest?.canJoin} />
      </Row>
    );
  }, [quest?.canJoin, quest?.status]);

  if (!quest) return null;

  return (
    <ImageCard
      key={quest.id}
      title={quest.name ?? '- Unknown -'}
      showBasedOn={false}
      statSections={[]}
      imgSrc={imageThumbnail?.url ?? IMAGE_DEFAULT_QUEST_THUMBNAIL}
      href={`/quests/${quest.id}/detail`}
      availableTags={availableTags}
      tags={module?.tags}
      statusBar={statusBar}
    />
  );
};

export default QuestCard;
