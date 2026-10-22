import React, { useCallback } from 'react';
import { MdClose } from 'react-icons/md';
import { Button } from '../../../../components/Button/Button';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import { styled } from '../../../../styles/stitches.config';
import { useDeleteEntityGroupContent } from '../../../../api/entities/useDeleteEntityGroupContent';
import { useGetMenuItemContent } from '../../../../api/menus/useGetMenuItemContent';

export const RemoveButtonWrapper = styled('span', {
  opacity: 0,
  transition: '0.3s all',

  variants: {
    version: {
      default: {},
      'top-right-corner': {
        position: 'absolute',
        top: 0,
        right: 0,
      },
    },
  },
});

interface RemoveEntityButtonProps {
  contentId: number;
}

const RemoveEntityContentButton: React.FC<RemoveEntityButtonProps> = ({ contentId }) => {
  const menuItemId = useSelector((state: ReduxState) => state.menuCategory.menuItemId);
  const { data: menuItemContent } = useGetMenuItemContent({
    variables: { menuItemId },
  });

  const mainEntityGroupId = menuItemContent?.mainGroupId ?? 0;

  const {
    mutate: deleteEntityGroupContent,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDeleteEntityGroupContent();

  const handleRemoveEntity = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      deleteEntityGroupContent({
        menuItemId,
        entityGroupId: mainEntityGroupId,
        contentId,
      });
      e.stopPropagation();
    },
    [contentId, deleteEntityGroupContent, mainEntityGroupId, menuItemId],
  );

  return (
    <Button icon onClick={handleRemoveEntity} size="sm" color="dangerOutline">
      <MdClose />
    </Button>
  );
};

export default RemoveEntityContentButton;
