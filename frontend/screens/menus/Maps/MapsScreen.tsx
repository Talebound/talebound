import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { TbPlus } from 'react-icons/tb';
import { Col, Row } from '../../../components/Flex/Flex';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { TitleH2 } from '../../../components/Typography/Title';
import MapFormModal from '../../../component-sections/Map/MapFormModal';
import MapList from '../../../component-sections/Map/MapList';

interface MapsScreenProps {
  canEdit?: boolean;
  moduleId?: number;
}

const MapsScreen: React.FC<MapsScreenProps> = ({ canEdit, moduleId }) => {
  const [createModal, setCreateModal] = useState(false);

  const openModal = useCallback(() => setCreateModal(true), []);

  const modalTriggerCreate = useMemo(
    () => (
      <Button color={'primaryOutline'} onClick={openModal}>
        <TbPlus />
        Create map
      </Button>
    ),
    [openModal],
  );

  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection flexWrap="wrap" direction="column">
          <Row gap="md" fullWidth justifyContent="between">
            <TitleH2>Maps</TitleH2>
            {canEdit && (
              <Row gap="md">
                <MapFormModal
                  trigger={modalTriggerCreate}
                  open={createModal}
                  setOpen={setCreateModal}
                />
              </Row>
            )}
          </Row>
          <MapList canEdit={canEdit} moduleId={moduleId} />
        </ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}></Col>
    </Row>
  );
};

export default MapsScreen;
