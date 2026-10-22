import React from 'react';
import DescriptionImage from '../../components/DescriptionImage/DescriptionImage';
import { TitleH3 } from '../../components/Typography/Title';
import ContentSection from '../../components/ContentSection/ContentSection';

const ArticleQuestCreation: React.FC = () => {
  return (
    <ContentSection direction="column" header="Quest creation">
      <p>
        <DescriptionImage
          src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/150x150"
          float="right"
          // circle
        />
        TBD
      </p>

      <TitleH3>Step 1</TitleH3>

      <p>TBD</p>

      <TitleH3>Step 2</TitleH3>

      <p>TBD</p>
    </ContentSection>
  );
};

export default ArticleQuestCreation;
