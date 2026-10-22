import React from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import ArticleAvailableWorldTags from '../../../articles/Admin/ArticleAvailableWorldTags';
import SectionNewTag from '../../modules/AvailableTags/SectionNewTag';
import SectionAvailableModuleTags from '../../modules/AvailableTags/SectionAvailableModuleTags';
import { PbModuleType } from '../../../generated/api-types/data-contracts';

const AvailableWorldTags: React.FC = () => {
  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <SectionAvailableModuleTags moduleType={PbModuleType.MODULE_TYPE_WORLD} />
        <SectionNewTag moduleType={PbModuleType.MODULE_TYPE_WORLD} />
      </Col>

      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ArticleAvailableWorldTags />
      </Col>
    </Row>
  );
};

export default AvailableWorldTags;
