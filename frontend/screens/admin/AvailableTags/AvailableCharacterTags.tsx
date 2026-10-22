import React from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import ArticleAvailableCharacterTags from '../../../articles/Admin/ArticleAvailableCharacterTags';
import SectionNewTag from '../../modules/AvailableTags/SectionNewTag';
import SectionAvailableModuleTags from '../../modules/AvailableTags/SectionAvailableModuleTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

const AvailableCharacterTags: React.FC = () => {
  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <SectionAvailableModuleTags moduleType={PbModuleType.MODULE_TYPE_CHARACTER} />
        <SectionNewTag moduleType={PbModuleType.MODULE_TYPE_CHARACTER} />
      </Col>

      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ArticleAvailableCharacterTags />
      </Col>
    </Row>
  );
};

export default AvailableCharacterTags;
