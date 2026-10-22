import React from 'react';
import { Col, Row } from '../../../../components/Flex/Flex';
import CurrentQuestSection from '../CurrentQuest/CurrentQuestSection';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import WorldCard from '../../../../components/WorldCard/WorldCard';
import SystemCard from '../../../../components/SystemCard/SystemCard';
import { useCharacter } from '../../../../hooks/useCharacter';
import { DetailCharacterPage } from '../detailCharacterLib';

interface DetailCharacterRightSectionProps {
  characterId: number;
  subpage?: DetailCharacterPage;
}

const DetailCharacterRightSection: React.FC<DetailCharacterRightSectionProps> = ({
  characterId,
  subpage = DetailCharacterPage.DETAIL,
}) => {
  const { character } = useCharacter(characterId);

  return (
    <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
      {character && (
        <>
          {subpage !== DetailCharacterPage.AVAILABLE_QUESTS && (
            <CurrentQuestSection characterId={characterId} />
          )}
          <ContentSection flexWrap="wrap" direction="column" header="World and System">
            <Row gap="md" fullWidth>
              <WorldCard worldId={character.worldId ?? 0} compact />
              <SystemCard systemId={character.systemId ?? 0} compact />
            </Row>
          </ContentSection>
        </>
      )}
    </Col>
  );
};

export default DetailCharacterRightSection;
