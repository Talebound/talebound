import React, { useMemo } from 'react';
import { useGetImages } from '../../api/images/useGetImages';
import { useAuth } from '../../hooks/useAuth';
import { Spin } from 'antd';
import { Row } from '../Flex/Flex';
import InfiniteScrollObserver from '../InfiniteScrollObserver/InfiniteScrollObserver';
import { imageUrlWithoutVariant, ImageVariant } from '../../utils/images/imageUtils';
import Image from '../Image/Image';
import { PbImage } from '../../generated/api-types/data-contracts';

interface ImageModalTabYourImagesProps {
  onClick: (image: PbImage) => void;
  selectedImageByUrl?: string;
  selectedImageById?: number;
}

const ImageModalTabYourImages: React.FC<ImageModalTabYourImagesProps> = ({
  onClick,
  selectedImageById,
  selectedImageByUrl,
}) => {
  const { user } = useAuth();

  const {
    data: imagesData,
    isFetching: isFetchingImages,
    fetchNextPage,
    hasNextPage,
  } = useGetImages({
    variables: {
      userId: user?.id,
    },
  });

  const selectedImageBaseUrl = useMemo(
    () => selectedImageByUrl && imageUrlWithoutVariant(selectedImageByUrl),
    [selectedImageByUrl],
  );

  return (
    <Spin spinning={isFetchingImages}>
      <Row gap="sm" wrap css={{ maxHeight: 300, overflowY: 'scroll' }}>
        {imagesData?.pages.map(
          (page) =>
            page.images?.map((i) => (
              <Image
                key={i.imgGuid}
                image={i}
                onClick={onClick}
                variant={ImageVariant['150x150']}
                selected={selectedImageBaseUrl === i.baseUrl || selectedImageById === i.id}
              />
            )),
        )}
        {hasNextPage && !isFetchingImages && (
          <InfiniteScrollObserver runOnObserve={fetchNextPage} />
        )}
      </Row>
    </Spin>
  );
};

export default ImageModalTabYourImages;
