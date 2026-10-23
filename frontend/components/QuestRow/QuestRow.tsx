import Link from 'next/link';
import { useAppSelector } from '../../store/hooks';
import React, { useMemo } from 'react';
import { PbModuleType } from '../../generated/api-types/data-contracts';
import { useGetModuleTypeAvailableTags } from '../../api/tags/useGetModuleTypeAvailableTags';
import { imageSelectors } from '../../adapters/ImageAdapter';
import { useQuest } from '../../hooks/useQuest';
import { Col, Row } from '../Flex/Flex';
import QuestStatusButton from '../QuestStatusButton/QuestStatusButton';
import QuestCanJoinButton from '../QuestCanJoinButton/QuestCanJoinButton';
import Image from '../Image/Image';
import { ImageVariant } from '../../utils/images/imageUtils';
import { TitleH3 } from '../Typography/Title';
import { Text } from '../Typography/Text';
import TagRow from '../TagRow/TagRow';

interface QuestRowProps {
  questId: number;
}

const QuestRow: React.FC<QuestRowProps> = ({ questId }) => {
  const { quest, module } = useQuest(questId);
  const imageThumbnail = useAppSelector((state) =>
    imageSelectors.selectById(state, module?.thumbnailImgId ?? 0),
  );

  const { data: availableTags = [] } = useGetModuleTypeAvailableTags({
    variables: PbModuleType.MODULE_TYPE_QUEST,
  });

  const statusBar = useMemo(() => {
    return (
      <Row gap="sm">
        {quest?.status && <QuestStatusButton questStatus={quest.status} />}
        <QuestCanJoinButton canJoin={!!quest?.canJoin} />
      </Row>
    );
  }, [quest?.canJoin, quest?.status]);

  if (!quest) return null;

  return (
    <Row fullWidth gap="md" alignItems="start" borderBottom fullHeight>
      {imageThumbnail && (
        <Link href={`/quests/${questId}/detail`}>
          <Image image={imageThumbnail} variant={ImageVariant['300x200']} />
        </Link>
      )}
      <Col gap="sm" fullWidth alignSelf="stretch" justifyContent="between" paddingBottom="sm">
        <Col gap="sm" fullWidth>
          <Row fullWidth gap="sm" justifyContent="between">
            <Link href={`/quests/${questId}/detail`}>
              <TitleH3>{quest.name}</TitleH3>
            </Link>
            {statusBar}
          </Row>
          <Text>{quest.shortDescription}</Text>
        </Col>
        <Row fullWidth gap="sm">
          <Text b>Tags:</Text>
          <TagRow
            availableTags={availableTags}
            tagIds={module?.tags ?? []}
            width={600}
            colorNonactive={'primaryOutline'}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default QuestRow;
