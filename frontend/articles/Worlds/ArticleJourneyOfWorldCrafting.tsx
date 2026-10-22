import React from 'react';
import DescriptionImage from '../../components/DescriptionImage/DescriptionImage';
import { TitleH3 } from '../../components/Typography/Title';
import ContentSection from '../../components/ContentSection/ContentSection';

const ArticleJourneyOfWorldCrafting: React.FC = () => {
  return (
    <ContentSection direction="column" header="Journey of World Crafting">
      <p>
        <DescriptionImage
          src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/86a41b17-730a-49ea-3cab-fd42467f7100/150x150"
          float="right"
          // circle
        />
        Embarking on your world creation journey is as simple as <b>naming your realm</b>. With just
        that, you&apos;ve taken your first step! However, why stop there? Unleash your creativity
        and bring forth a world as immense as the universe itself, teeming with complex ecosystems,
        intricate technologies, mystical magics, captivating religions, and enthralling intrigues.
        The possibilities are limitless.
      </p>

      <TitleH3>Step 1 - The Seed of Creation</TitleH3>

      <p>
        All it takes to spark life into your world is a name. Along with this, you may choose to
        share a glimpse of its unique allure through a short description or a tantalizing tale about
        its origins.
      </p>
      <TitleH3>Step 2 - Breathing Life into Your World</TitleH3>

      <p>
        Just naming your world doesn&apos;t quite do it justice, especially if you want it to
        captivate other adventurers. Talebound equips you with a wide array of customization options
        to sculpt a world that is as compelling as it is unique.
      </p>
      <p>
        <DescriptionImage
          src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/794cc051-844d-4c64-fe4e-6e5367e38000/200x300"
          float="left"
        />
        <b>Appearance</b> - Customize the aesthetic of your world&apos;s page by providing unique
        images for the <i>header</i>, <i>thumbnail</i>, and <i>avatar</i>. These images set the
        stage for adventurers exploring your world.
        <br />
        <br />
        <b>Navigation</b> - Take control of the website&apos;s side navigation by crafting your own
        sections. Within these sections, you&apos;re free to build your own pages, articles, and
        resources - effectively, your personal world encyclopedia.
        <br />
        <br />
        <b>Cartography</b> - Design detailed maps of your realm and mark points of interest. These
        markers can be linked to pages, articles, and resources, creating an interactive experience
        for adventurers.
        <br />
        <br />
      </p>
      <p>
        Don&apos;t forget to add an engaging introductory post displayed on your world&apos;s
        profile, and provide tags for easy discovery of your world in the vast Talebound universe.
      </p>
      <TitleH3>Collaboration and Shared Universe Creation</TitleH3>
      <p>
        World-building needn&apos;t be a solitary endeavor. Rally fellow creators to contribute to
        your world. With their aid, you can enrich your resources and add depth to your maps.
        Collaborate, innovate, and elevate your world to new heights.
      </p>
    </ContentSection>
  );
};

export default ArticleJourneyOfWorldCrafting;
