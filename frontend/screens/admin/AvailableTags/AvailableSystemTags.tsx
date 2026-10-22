import React from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import ArticleAvailableSystemTags from '../../../articles/Admin/ArticleAvailableSystemTags';
import SectionNewTag from '../../modules/AvailableTags/SectionNewTag';
import SectionAvailableModuleTags from '../../modules/AvailableTags/SectionAvailableModuleTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

const AvailableSystemTags: React.FC = () => {
  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <SectionAvailableModuleTags moduleType={PbModuleType.MODULE_TYPE_SYSTEM} />
        <SectionNewTag moduleType={PbModuleType.MODULE_TYPE_SYSTEM} />
      </Col>

      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ArticleAvailableSystemTags />
      </Col>
    </Row>
  );
};

export default AvailableSystemTags;
