import React from 'react';
import { Row, Col } from '../../components/Flex/Flex';
import { TitleH2, TitleH3 } from '../../components/Typography/Title';
import { Text } from '../../components/Typography/Text';

const PageAbout: React.FC = () => {
  return (
    <Row fullWidth padding="xl">
      <Col>
        <TitleH2>About Talebound</TitleH2>
        <Text>
          Welcome to Talebound, the premier platform for text-based role-playing games and immersive
          storytelling experiences. Our mission is to bring together storytellers, dungeon masters,
          and role-players from around the world to create, share, and explore captivating stories
          and extraordinary worlds.
        </Text>
        <br />

        <TitleH3>Our Journey</TitleH3>
        <Text>
          Talebound was started in 2023. We believe that stories have the power to connect people,
          inspire new ideas, and transport us to realms of endless possibilities. Talebound is the
          culmination of our dedication to providing an accessible, engaging, and supportive space
          for individuals to unleash their creativity and embark on unforgettable adventures.
        </Text>
        <br />
        <br />

        <TitleH3>Our Platform</TitleH3>
        <Text>
          Talebound offers a wide array of features and tools to enhance your text-based
          role-playing experience. From customizable world-building tools and diverse character
          creation options to intuitive text editors and real-time in-game chat, we&apos;ve designed
          our platform to cater to users of all experience levels and interests.
        </Text>
        <br />

        <Text>
          Whether you&apos;re a seasoned role-player, a first-time dungeon master, or a casual
          storyteller, our user-friendly interface and extensive tutorial resources ensure that you
          have everything you need to dive into the world of text-based adventures.
        </Text>
        <br />

        <TitleH3>Our Community</TitleH3>
        <Text>
          At the heart of Talebound is our vibrant and diverse community of dreamers, creators, and
          adventurers. We are proud to foster an inclusive and supportive environment where users
          can connect, collaborate, and learn from one another. Our community forums offer a space
          for users to discuss their experiences, share tips and tricks, and work together on new
          ideas and custom worlds.
        </Text>
        <br />

        <Text>
          Join us in our quest to explore the boundless realms of imagination and create
          unforgettable stories. Sign up today and become a part of the Talebound family. Your story
          awaits!
        </Text>
      </Col>
    </Row>
  );
};

export default PageAbout;
