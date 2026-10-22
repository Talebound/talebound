import React, { useCallback, useState } from 'react';
import ContentSection from '../../../components/ContentSection/ContentSection';
import { useUpdateMenu } from '../../../api/menus/useUpdateMenu';
import ImageModal from '../../../components/ImageModal/ImageModal';
import { PbImage } from '../../../generated/api-types/data-contracts';
import { NavbarWrapper } from '../../../components/LeftNavbar/navbarComponents';
import NavbarHeader from '../../../components/LeftNavbar/NavbarHeader';
import { Button } from '../../../components/Button/Button';
import { Row } from '../../../components/Flex/Flex';
import ErrorText from '../../../components/ErrorText/ErrorText';
import { Text } from '../../../components/Typography/Text';

interface MenuHeaderImageProps {
  menuId: number;
}

const MenuHeaderImage: React.FC<MenuHeaderImageProps> = ({ menuId }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  const { mutate: updateMenu, isPending: isPending, error } = useUpdateMenu();

  const changeMenuHeaderImage = useCallback(
    (image: PbImage) => {
      updateMenu({
        menuId,
        body: {
          headerImgId: image.id,
        },
      });
    },
    [menuId, updateMenu],
  );

  return (
    <>
      <ContentSection flexWrap="wrap" direction="column" header="Menu header image">
        <Row gap="md" wrap>
          <NavbarWrapper>
            <NavbarHeader title={'header title'} />
          </NavbarWrapper>
          <Button loading={isPending} onClick={() => setShowImageModal(true)}>
            Change
          </Button>
        </Row>
        <Text>
          These can be a bit tricky to get right. Menu header image is darkened, and then text is
          painted right over it with original colors. That is why we recommend using lighter, not
          very detailed images (maybe some details on the sides, but not in the middle).
        </Text>
        <ErrorText error={error} />
      </ContentSection>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={changeMenuHeaderImage}
        uploadedFilename={`menu-header-image-${menuId}`}
        uploadedImageTypeId={1300}
      />
    </>
  );
};

export default MenuHeaderImage;
