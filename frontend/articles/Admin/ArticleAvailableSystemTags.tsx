import React from 'react';
import DescriptionImage from '../../components/DescriptionImage/DescriptionImage';
import ContentSection from '../../components/ContentSection/ContentSection';

const ArticleAvailableSystemTags: React.FC = () => {
  return (
    <ContentSection direction="column" header="Available system tags">
      <p>
        System tags act as categorical identifiers for your created systems. They provide a quick
        reference to the thematic elements and settings of each system, allowing users to understand
        its core elements at a glance.
      </p>
      <p>
        <DescriptionImage
          src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/150x150"
          float="right"
          // circle
        />
        By utilizing tags, you enhance searchability, improve user navigation, and streamline the
        system selection process for adventurers. As an admin, you can add, update, or delete these
        tags to ensure they align with the evolving content on the platform. Think of them as
        concise descriptors that encapsulate the primary essence of a system, aiding in efficient
        system management and user experience.
      </p>
    </ContentSection>
  );
};

export default ArticleAvailableSystemTags;
