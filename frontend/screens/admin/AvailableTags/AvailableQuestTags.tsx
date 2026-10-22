import React from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import ArticleAvailableQuestTags from '../../../articles/Admin/ArticleAvailableQuestTags';
import SectionNewTag from '../../modules/AvailableTags/SectionNewTag';
import SectionAvailableModuleTags from '../../modules/AvailableTags/SectionAvailableModuleTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

const AvailableQuestTags: React.FC = () => {
  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <SectionAvailableModuleTags moduleType={PbModuleType.MODULE_TYPE_QUEST} />
        <SectionNewTag moduleType={PbModuleType.MODULE_TYPE_QUEST} />
      </Col>

      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ArticleAvailableQuestTags />
      </Col>
    </Row>
  );
};

export default AvailableQuestTags;
