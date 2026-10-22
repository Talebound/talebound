import React from 'react';
import { MainContent } from '../../components/MainContent/MainContent';
import { Col } from '../../components/Flex/Flex';
import HomepageCard from './HomepageCard';
import { styled } from '../../styles/stitches.config';

const ContentQuote = styled(Col, {
  gap: '$lg',
  textAlign: 'center',
  maxWidth: '960px',
  padding: '$lg',
  fontSize: '$xl',
  fontStyle: 'italic',

  '@smMax': {
    fontSize: '$lg',
  },
  '@xsMax': {
    fontSize: '$md',
  },
});

const CardWrapper = styled('div', {
  width: '$full',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-evenly',
  gap: '$md',
});

const HomepageContent: React.FC = () => {
  return (
    <MainContent>
      <ContentQuote>
        Embark on thrilling text-based adventures and create your own immersive worlds in Talebound,
        the ultimate destination for storytellers, dungeon masters, and role-players alike. Dive
        into the limitless realms of imagination, where you can explore fantastic worlds, experience
        captivating stories, and forge unforgettable friendships.
      </ContentQuote>
      <CardWrapper>
        <Col gap="md">
          <HomepageCard
            image="1"
            cardType="left"
            heading="Engaging Text-Based RPG Gameplay"
            text="Immerse yourself in the dynamic, text-driven role-playing experiences, where your choices, actions, and strategic decisions shape the narrative and determine the outcome of your adventures."
          />
          <HomepageCard
            image="2"
            cardType="left"
            heading="Custom World Building"
            text="Unleash your creativity with our easy-to-use world-building tools, where
                you can craft every aspect of your world, from landscapes, races, and classes to quests, NPCs, items,
                and skills."
          />
          <HomepageCard
            image="3"
            cardType="left"
            heading="World-Specific Character Creation"
            text="Once you've chosen (or created) your world, design your unique character
                from a variety of world-specific races, classes, and skills, and bring them to life in the immersive
                environment crafted by the world's creator."
          />
        </Col>
        <Col gap="md">
          <HomepageCard
            image="4"
            cardType="right"
            heading="Fantasy, sci-fi, real world?"
            text="We've got you covered! Talebound is not limited to specific genre, you
                can create or join whatever you want."
          />
          <HomepageCard
            image="5"
            cardType="right"
            heading="AI-based world building tools"
            text="Let AI help you with creating illustrations or descriptions for your
                world. Pictures of items, locations, character avatars,... Do you see this homepage? Every picture was
                created with Midjourney."
          />
          <HomepageCard
            image="6"
            cardType="right"
            heading="Open source"
            text="Probably not useful for most of the people, but... in case you are a
                developer and you are missing something, feel free to contribute! Talebound is open source. You can find
                links to github in the footer."
          />
        </Col>
      </CardWrapper>
    </MainContent>
  );
};

export default HomepageContent;
