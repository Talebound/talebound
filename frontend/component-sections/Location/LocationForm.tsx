import React, { useCallback, useState } from 'react';
import Textarea from '../../components/Textarea/Textarea';
import { useInput } from '../../hooks/useInput';
import Input from '../../components/Input/Input';
import { Col, Row } from '../../components/Flex/Flex';
import AvatarById from '../../components/AvatarById/AvatarById';
import { useGetModuleId } from '../../api/modules/useGetModuleId';
import { Label } from '../../components/Typography/Label';
import ImageModal from '../../components/ImageModal/ImageModal';
import { PbImage, PbViewModule, PbLocation } from '../../generated/api-types/data-contracts';
import ErrorText from '../../components/ErrorText/ErrorText';
import { Button } from '../../components/Button/Button';
import { useCreateLocation } from '../../api/locations/useCreateLocation';
import { useUpdateLocation } from '../../api/locations/useUpdateLocation';

const textareaPlaceholder =
  'Short description of the post. What information does this post contain?';

interface LocationFormProps {
  module: PbViewModule;
  canChangeName?: boolean;
  canChangeDescription?: boolean;
  canChangeThumbnail?: boolean;
  onFinishCallback?: () => void;
  location?: PbLocation;
}

const LocationForm: React.FC<LocationFormProps> = ({
  module,
  canChangeName = true,
  canChangeDescription = true,
  canChangeThumbnail = true,
  onFinishCallback,
  location,
}) => {
  const { data: moduleId } = useGetModuleId({ variables: module });
  const {
    mutate: createLocation,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreateLocation();

  const {
    mutate: updateLocation,
    isPending: isPendingUpdate,
    error: errorUpdate,
  } = useUpdateLocation();

  const [showImageModal, setShowImageModal] = useState(false);
  const [thumbnailImageId, setThumbnailImageId] = useState<number | undefined>(
    location ? location.thumbnailImageId : undefined,
  );
  const { value: name, onChange: onChangeName } = useInput<string>(
    location ? location.name ?? '' : '',
  );
  const { value: description, onChange } = useInput<string, HTMLTextAreaElement>(
    location ? location.description ?? '' : '',
  );

  const toggleImageModal = useCallback(() => {
    setShowImageModal((p) => !p);
  }, []);

  const changeThumbnailImage = useCallback(
    (image: PbImage | undefined) => {
      if (canChangeThumbnail && image) {
        setThumbnailImageId(image.id);
      }
    },
    [canChangeThumbnail],
  );

  const createLocationHandler = useCallback(() => {
    if (moduleId) {
      const options = {
        onSuccess: () => {
          if (onFinishCallback) onFinishCallback();
        },
      };

      const body = {
        name: canChangeName && name ? name : undefined,
        description: canChangeDescription && description ? description : undefined,
        thumbnailImageId: canChangeThumbnail && thumbnailImageId ? thumbnailImageId : undefined,
      };

      if (location) {
        //update
        if (location.id) {
          updateLocation(
            {
              locationId: location.id,
              body,
            },
            options,
          );
        }
      } else {
        //create
        createLocation(
          {
            ...body,
            moduleId,
          },
          options,
        );
      }
    }
  }, [
    moduleId,
    canChangeName,
    name,
    canChangeDescription,
    description,
    canChangeThumbnail,
    thumbnailImageId,
    location,
    onFinishCallback,
    updateLocation,
    createLocation,
  ]);

  const pending = isPendingUpdate || isPendingCreate;

  if (!canChangeName && !canChangeDescription && !canChangeThumbnail) return null;

  return (
    <>
      <Row fullWidth gap="md" alignItems="start">
        <Col fullWidth gap="md">
          {canChangeName && (
            <Input id="name" label="Name" onChange={onChangeName} value={name} required fullWidth />
          )}
          {canChangeDescription && (
            <Textarea
              id="description"
              label="Short description"
              placeholder={textareaPlaceholder}
              rows={5}
              value={description}
              onChange={onChange}
            />
          )}
          <Button onClick={createLocationHandler} loading={pending}>
            {location ? 'Update' : 'Create'}
          </Button>
          <ErrorText error={errorCreate ?? errorUpdate} />
        </Col>
        {canChangeThumbnail && (
          <Col gap="md" alignItems="center" padding="xl">
            <Label css={{ width: 'auto' }}>Thumbnail</Label>
            <AvatarById
              loading={pending}
              onClick={toggleImageModal}
              size="xl"
              imageId={thumbnailImageId}
            />
          </Col>
        )}
      </Row>
      <ImageModal
        open={showImageModal}
        setOpen={setShowImageModal}
        trigger={null}
        onSubmit={changeThumbnailImage}
        uploadedFilename={`location-${JSON.stringify(module)}`}
        uploadedImageTypeId={500}
      />
    </>
  );
};

export default LocationForm;
