import React, { useCallback, useMemo, useState } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import LocationNew from '../../../component-sections/Location/LocationNew';
import LocationList from '../../../component-sections/Location/LocationList';
import { TitleH2 } from '../../../components/Typography/Title';
import { Button } from '../../../components/Button/Button';
import { TbPlus } from 'react-icons/tb';
import LocationFormModal from '../../../component-sections/Location/LocationFormModal';
import { useModuleRoute } from '../../../hooks/useModuleRoute';
import { PbEntityType } from '../../../generated/api-types/data-contracts';

interface LocationsScreenProps {
  canEdit?: boolean;
}

const LocationsScreen: React.FC<LocationsScreenProps> = ({ canEdit }) => {
  const [module] = useModuleRoute(PbEntityType.ENTITY_TYPE_LOCATION);
  const [createModal, setCreateModal] = useState(false);

  const openModal = useCallback(() => setCreateModal(true), []);
  const locationModalTrigger = useMemo(
    () => (
      <Button color={'primaryOutline'} onClick={openModal}>
        <TbPlus />
        Create location
      </Button>
    ),
    [openModal],
  );

  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection flexWrap="wrap" direction="column">
          <Row gap="md" fullWidth justifyContent="between">
            <TitleH2>Locations</TitleH2>
            {canEdit && (
              <Row gap="md">
                <LocationFormModal
                  module={module}
                  trigger={locationModalTrigger}
                  open={createModal}
                  setOpen={setCreateModal}
                />
              </Row>
            )}
          </Row>
          <LocationList canEdit={canEdit} />
        </ContentSection>
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <LocationNew canEdit={canEdit} />
      </Col>
    </Row>
  );
};

export default LocationsScreen;
