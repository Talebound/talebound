import React from 'react';
import DescriptionImage from '../../components/DescriptionImage/DescriptionImage';
import ContentSection from '../../components/ContentSection/ContentSection';

const ArticleAvailableWorldTags: React.FC = () => {
  return (
    <ContentSection direction="column" header="Available world tags">
      <p>
        World tags act as categorical identifiers for your created worlds. They provide a quick
        reference to the thematic elements and settings of each world, allowing users to understand
        its core elements at a glance.
      </p>
      <p>
        <DescriptionImage
          src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/150x150"
          float="right"
          // circle
        />
        By utilizing tags, you enhance searchability, improve user navigation, and streamline the
        world selection process for adventurers. As an admin, you can add, update, or delete these
        tags to ensure they align with the evolving content on the platform. Think of them as
        concise descriptors that encapsulate the primary essence of a world, aiding in efficient
        world management and user experience.
      </p>
    </ContentSection>
  );
};

export default ArticleAvailableWorldTags;
