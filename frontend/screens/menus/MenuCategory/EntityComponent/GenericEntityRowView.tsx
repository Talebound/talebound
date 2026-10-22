import React, { PropsWithChildren } from 'react';
import AvatarById from '../../../../components/AvatarById/AvatarById';
import { Row } from '../../../../components/Flex/Flex';
import { Text } from '../../../../components/Typography/Text';
import RemoveEntityContentButton, { RemoveButtonWrapper } from './RemoveEntityContentButton';
import { styled } from '../../../../styles/stitches.config';
import useLinkEntity from './useLinkEntity';

export const Wrapper = styled(Row, {
  '&:hover': {
    [`${RemoveButtonWrapper}`]: {
      opacity: 1,
    },
  },
});

interface GenericEntityRowViewProps extends PropsWithChildren {
  contentId?: number;
  entityId: number;
  title?: string;
  avatarImageId?: number;
  editModeInfo?: string;
  editMode?: boolean;
}

const GenericEntityRowView: React.FC<GenericEntityRowViewProps> = ({
  contentId,
  entityId,
  children,
  title,
  avatarImageId,
  editModeInfo,
  editMode = false,
}) => {
  const { component: LinkEntity, callback: openEntity } = useLinkEntity(entityId, !editMode);

  return (
    <Wrapper
      padding="xs"
      fullWidth
      gap="md"
      hoverHighlight
      hoverPointer={!editMode}
      onClick={openEntity}
    >
      {editMode ? children : null}
      <Row gap="md" fullWidth justifyContent="between" alignSelf="between">
        <LinkEntity valid={!editMode}>
          <div style={{ width: '36px' }}>
            <AvatarById size="md" imageId={avatarImageId} />
          </div>
        </LinkEntity>
        <Row gap="md" fullWidth justifyContent="between" alignSelf="between">
          <Text css={{ flexBasis: '100px', flexGrow: 1 }}>
            <LinkEntity valid={!editMode}>{title}</LinkEntity>
          </Text>

          {editMode && editModeInfo && (
            <Text size="sm" i css={{ flexBasis: '100px' }}>
              {editModeInfo}
            </Text>
          )}
          {editMode && contentId && (
            <RemoveButtonWrapper>
              <RemoveEntityContentButton contentId={contentId} />
            </RemoveButtonWrapper>
          )}
        </Row>
      </Row>
    </Wrapper>
  );
};

export default GenericEntityRowView;
