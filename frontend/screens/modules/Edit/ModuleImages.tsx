import React, { useCallback, useState } from 'react';
import { Col, Row } from '../../../components/Flex/Flex';
import { Label } from '../../../components/Typography/Label';
import Avatar from '../../../components/Avatar/Avatar';
import { styled } from '../../../styles/stitches.config';
import { TitleH2 } from '../../../components/Typography/Title';
import ImageModal from '../../../components/ImageModal/ImageModal';
import { PbImage } from '../../../generated/api-types/data-contracts';
import {
  IMAGE_DEFAULT_WORLD_AVATAR,
  IMAGE_DEFAULT_WORLD_HEADER,
  IMAGE_DEFAULT_WORLD_THUMBNAIL,
} from '../../../utils/images/imageDefaultUrls';
import { useImage } from '../../../hooks/useImage';
import { useUpdateModule } from '../../../api/modules/useUpdateModule';
import { useModule } from '../../../hooks/useModule';

const ModuleImagesWrapper = styled(Row, {
  defaultVariants: {
    gap: 'md',
    justifyContent: 'between',
  },
});

const ImageColWrapper = styled(Col, {
  width: '125px',

  defaultVariants: {
    gap: 'md',
    alignItems: 'center',
    justifyContent: 'between',
  },
});

enum ModuleImageType {
  thumbnailImg = 'thumbnailImg',
  avatarImg = 'avatarImg',
  headerImg = 'headerImg',
}

interface ImageTypeInfo {
  filename: string;
  imageTypeId: number;
}

const imageTypeInfo: Record<ModuleImageType, ImageTypeInfo> = {
  [ModuleImageType.thumbnailImg]: {
    filename: 'module-thumbnail',
    imageTypeId: 1200,
  },
  [ModuleImageType.avatarImg]: {
    filename: 'module-avatar',
    imageTypeId: 400,
  },
  [ModuleImageType.headerImg]: {
    filename: 'module-header',
    imageTypeId: 300,
  },
};

interface ModuleImagesProps {
  moduleId: number;
  disabled?: boolean;
}

const ModuleImages: React.FC<ModuleImagesProps> = ({ moduleId, disabled }) => {
  const { module } = useModule(moduleId);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalType, setModalType] = useState<ModuleImageType>(ModuleImageType.thumbnailImg);

  const { image: thumbnailImg } = useImage(module?.thumbnailImgId ?? 0);
  const { image: avatarImg } = useImage(module?.avatarImgId ?? 0);
  const { image: headerImg } = useImage(module?.headerImgId ?? 0);

  const updateModuleMutation = useUpdateModule();

  const changeModuleImage = useCallback(
    (image: PbImage) => {
      updateModuleMutation.mutate({
        moduleId: moduleId,
        body: {
          [`${modalType}Id`]: image.id,
        },
      });
    },
    [modalType, updateModuleMutation, moduleId],
  );

  const openModal = useCallback(
    (imageType: ModuleImageType) => {
      if (!disabled) {
        setModalType(imageType);
        setShowImageModal(true);
      }
    },
    [disabled],
  );

  const openModalThumbnail = useCallback(
    () => openModal(ModuleImageType.thumbnailImg),
    [openModal],
  );
  const openModalAvatar = useCallback(() => openModal(ModuleImageType.avatarImg), [openModal]);
  const openModalHeader = useCallback(() => openModal(ModuleImageType.headerImg), [openModal]);

  return (
    <>
      <TitleH2 css={{ marginTop: '$lg' }} marginBottom="md">
        Images
      </TitleH2>
      <ModuleImagesWrapper>
        <ImageColWrapper>
          <Avatar
            onClick={openModalThumbnail}
            size="xl"
            url={thumbnailImg?.url ?? IMAGE_DEFAULT_WORLD_THUMBNAIL}
          />
          <Label css={{ width: 'auto' }}>Thumbnail</Label>
        </ImageColWrapper>
        <ImageColWrapper>
          <Avatar
            onClick={openModalAvatar}
            size="xl"
            url={avatarImg?.url ?? IMAGE_DEFAULT_WORLD_AVATAR}
          />
          <Label css={{ width: 'auto' }}>Avatar</Label>
        </ImageColWrapper>
        <ImageColWrapper>
          <Avatar
            onClick={openModalHeader}
            size="xl"
            url={headerImg?.url ?? IMAGE_DEFAULT_WORLD_HEADER}
          />
          <Label css={{ width: 'auto' }}>Header</Label>
        </ImageColWrapper>
      </ModuleImagesWrapper>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={changeModuleImage}
        uploadedFilename={imageTypeInfo[modalType].filename}
        uploadedImageTypeId={imageTypeInfo[modalType].imageTypeId}
      />
    </>
  );
};

export default ModuleImages;
