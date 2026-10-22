import React, { useState } from 'react';
import ContentSection from '../../../../components/ContentSection/ContentSection';
import PostList from '../../../../component-sections/Post/PostList';
import { useUrlModuleId } from '../../../../hooks/useUrlModuleId';
import { PbEntityType } from '../../../../generated/api-types/data-contracts';
import { MessageBox } from '../../../../components/MessageBox/MessageBox';
import { Row } from '../../../../components/Flex/Flex';
import ImageButton from '../../../../components/ImageButton/ImageButton';
import { EntityTableType } from '../../../../utils/types/tables';
import MapList from '../../../../component-sections/Map/MapList';

interface EntityChoiceProps {
  canEdit?: boolean;
  moduleImageThumbnail?: string;
}

const EntityChoice: React.FC<EntityChoiceProps> = ({ canEdit, moduleImageThumbnail }) => {
  const [selectedEntityType, setSelectedEntityType] = useState<PbEntityType>(
    PbEntityType.ENTITY_TYPE_POST,
  );
  const moduleId = useUrlModuleId();

  return (
    <ContentSection flexWrap="wrap" direction="column" cornerImage={moduleImageThumbnail}>
      <Row gap="sm" fullWidth wrap>
        <ImageButton
          title={'Posts'}
          imgUrl="http://dev.talebound.net:4000/assets/images/dnd.png"
          active={selectedEntityType === PbEntityType.ENTITY_TYPE_POST}
          onClick={() => setSelectedEntityType(PbEntityType.ENTITY_TYPE_POST)}
        />
        <ImageButton
          title={'Maps'}
          imgUrl="http://dev.talebound.net:4000/assets/images/world_building.png"
          active={selectedEntityType === PbEntityType.ENTITY_TYPE_MAP}
          onClick={() => setSelectedEntityType(PbEntityType.ENTITY_TYPE_MAP)}
        />
        <ImageButton
          title={'Locations'}
          imgUrl="http://dev.talebound.net:4000/assets/images/fantasy_world.png"
          active={selectedEntityType === PbEntityType.ENTITY_TYPE_LOCATION}
          onClick={() => setSelectedEntityType(PbEntityType.ENTITY_TYPE_LOCATION)}
        />
        <ImageButton
          title={'Images'}
          imgUrl="http://dev.talebound.net:4000/assets/images/sci-fi.png"
          active={selectedEntityType === PbEntityType.ENTITY_TYPE_IMAGE}
          onClick={() => setSelectedEntityType(PbEntityType.ENTITY_TYPE_IMAGE)}
        />
      </Row>
      <MessageBox>Use Drag handle to move items to the right menu</MessageBox>
      {selectedEntityType === PbEntityType.ENTITY_TYPE_POST && (
        <PostList tableType={EntityTableType.DRAG} canEdit={canEdit} moduleId={moduleId} />
      )}
      {selectedEntityType === PbEntityType.ENTITY_TYPE_MAP && (
        <MapList tableType={EntityTableType.DRAG} canEdit={canEdit} moduleId={moduleId} />
      )}
      {selectedEntityType === PbEntityType.ENTITY_TYPE_LOCATION && `Location selection`}
      {selectedEntityType === PbEntityType.ENTITY_TYPE_IMAGE && `Image selection`}
    </ContentSection>
  );
};

export default EntityChoice;
