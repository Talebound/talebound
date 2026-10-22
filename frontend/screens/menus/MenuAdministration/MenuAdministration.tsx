import React, { useCallback, useEffect, useState } from 'react';
import { useGetMenuItems } from '../../../api/menus/useGetMenuItems';
import MenuItem from './MenuItem';
import { Reorder } from 'framer-motion';
import { PbMenuItem } from '../../../generated/api-types/data-contracts';
import { styled } from '../../../styles/stitches.config';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { Col, Row } from '../../../components/Flex/Flex';
import ArticleMenuAdministration from '../../../articles/Admin/ArticleMenuAdministration';
import MenuHeader from './MenuHeader';
import { findDuplicates } from '../../../utils/functions/findDuplicates';
import NewMenuItem from './NewMenuItem';
import ErrorText from '../../../components/ErrorText/ErrorText';
import MenuHeaderImage from './MenuHeaderImage';

const ReorderGroupWrapper = styled('div', {
  transition: 'opacity 0.2s ease-in-out',

  variants: {
    loading: {
      true: {
        opacity: 0.5,
      },
    },
  },
});

interface MenuAdministrationProps {
  menuId: number;
  reservedCodes?: string[];
}

let groupCounter = 0;

const MenuAdministration: React.FC<MenuAdministrationProps> = ({ menuId, reservedCodes }) => {
  const { data: menuItemsData = [] } = useGetMenuItems({ variables: menuId });

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<PbMenuItem[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setItems(menuItemsData);
  }, [menuItemsData]);

  const onReorder = useCallback((x: PbMenuItem[]) => {
    setItems(x);
  }, []);

  const groups = items.filter((x) => x.isMain);
  const groupCount = groups.length;

  const duplicates = findDuplicates(items.filter((x) => !x.isMain).map((x) => x.code ?? ''));

  return (
    <Row gap="md" alignItems="start" wrap>
      <Col css={{ flexGrow: 5, flexBasis: '10rem' }}>
        <ContentSection flexWrap="wrap" direction="column" header="Menu items">
          <MenuHeader />
          <ReorderGroupWrapper loading={loading}>
            <Reorder.Group as="div" axis="y" values={items} onReorder={onReorder}>
              {items.map((item, i) => {
                if (i === 0) groupCounter = 0;
                if (item.isMain) groupCounter++;

                return (
                  <MenuItem
                    key={item.id}
                    currentIndex={i + 1}
                    data={item}
                    setLoading={setLoading}
                    groupMovableUp={item.isMain && groupCounter > 1}
                    groupMovableDown={item.isMain && groupCounter < groupCount}
                    nextGroupItemId={groups[groupCounter]?.id}
                    notUniqueCode={duplicates.includes(item.code ?? '')}
                    reservedCodes={reservedCodes}
                    setError={setError}
                  />
                );
              })}
            </Reorder.Group>
          </ReorderGroupWrapper>
          <ErrorText error={error} />
        </ContentSection>
        <NewMenuItem menuId={menuId} />
        <MenuHeaderImage menuId={menuId} />
      </Col>
      <Col css={{ flexGrow: 0, flexBasis: '600px' }}>
        <ArticleMenuAdministration />
      </Col>
    </Row>
  );
};

export default MenuAdministration;
