import React from 'react';
import { TitleH3 } from '../../components/Typography/Title';
import ContentSection from '../../components/ContentSection/ContentSection';
import { TbShield, TbShieldStar } from 'react-icons/tb';
import { Row } from '../../components/Flex/Flex';

const ArticleWorldCollaboration: React.FC = () => {
  return (
    <ContentSection direction="column" header="World Collaboration - what does it mean?">
      <p>
        There are 2 types of collaborators - <strong>collaborator</strong> and{' '}
        <strong>super collaborator</strong>. Both of them can edit the world, but super collaborator
        has more rights.
      </p>

      <TitleH3 underline={false}>
        <Row gap="sm">
          <TbShield size={30} /> Collaborator
        </Row>
      </TitleH3>

      <p>
        <li>edit introduction post</li>
        <li>rearrange categories in menu</li>
        <li>create new post and assign them to categories</li>
      </p>

      <TitleH3 color="warning" underline={false}>
        <Row gap="sm">
          <TbShieldStar size={30} /> Super collaborator
        </Row>
      </TitleH3>

      <p>
        <li>change name, &quot;based on&quot; and short description</li>
        <li>change tags</li>
        <li>change images - header, avatar and thumbnail</li>
        <li>approve other collaborators, make them super collaborators or remove them</li>
      </p>
    </ContentSection>
  );
};

export default ArticleWorldCollaboration;
