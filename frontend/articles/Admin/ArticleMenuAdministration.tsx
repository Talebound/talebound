import React from 'react';
import DescriptionImage from '../../components/DescriptionImage/DescriptionImage';
import ContentSection from '../../components/ContentSection/ContentSection';
import { TitleH2, TitleH3 } from '../../components/Typography/Title';
import { Text } from '../../components/Typography/Text';
import { MdDragIndicator } from 'react-icons/md';

const ArticleMenuAdministration: React.FC = () => {
  return (
    <ContentSection direction="column" header="Basics">
      <p>
        <DescriptionImage
          src="https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/b5bca192-5a78-49d3-869d-e259f1b75400/200x300"
          float="right"
        />
        There are two types of menu items - Headers and Links. You can reorder the them by dragging
        the{' '}
        <Text b>
          handle <MdDragIndicator size={20} />
        </Text>{' '}
        and you can toggle between the two types (Header / Link) by clicking on a{' '}
        <Text b>checkbox</Text>
        .<br />
        <br />
        <TitleH3>1. Header</TitleH3>A header is a menu item that is not clickable and is used to
        group link menu items. Every link item that is below a header item will form a group. You
        can move whole groups by clicking <Text b>green arrow buttons</Text>.<br />
        <br />
        <TitleH3>2. Link</TitleH3>A link is a menu item that is clickable and is used to navigate to
        a different section. You can add content into these sections, when you open them.
      </p>

      <p>
        Every menu item has a <Text b>title</Text>, link items also need a <Text b>url code</Text>.
        URL codes are will be visible in the address bar of your browser and they can contain only
        lowercase letters and dashes.
      </p>

      <p>
        After you <Text b>delete</Text> an item, its content (mainly assigned posts) will be
        automatically unassigned. It will not be lost, but you will need to assign again for it to
        be visible to users.
      </p>

      <TitleH2>Default and reserved items</TitleH2>
      <p>
        When you create your entity (world, play mode,...) some items will be added to menu by{' '}
        <Text b>default</Text>, to help you get started. You can delete or edit them as you wish.
        However, some entities have their own <Text b>reserved</Text> items, that cannot be deleted
        and only partially edited (for example, Maps in world creation - you will find their list
        below).
        <br />
        <br />
        <TitleH3>Reserved items</TitleH3> By default reserved items are displayed at the beginning
        of the menu, above the first group. If you want to edit them, you need to use the{' '}
        <Text b>predefined URL codes</Text>. When you set one of these URL codes to a link item
        (input box should turn blue), it replaces the reserved item - now you can rearrange it and
        edit its title as you wish. Its content will stay the same. After deletion, it will appear
        on the top again.
        <br />
        <br />
        <TitleH3>Lists of reserved items</TitleH3> <Text b>World menu</Text> - maps
      </p>
    </ContentSection>
  );
};

export default ArticleMenuAdministration;
