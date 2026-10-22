import React from 'react';
import { styled } from '../../../styles/stitches.config';
import { TitleH4 } from '../../../components/Typography/Title';
import { PbImage } from '../../../generated/api-types/data-contracts';
import { Text } from '../../../components/Typography/Text';
import Stitches from '@stitches/react';

const BackgroundImage = styled('img', {
  display: 'block',
  width: '100%',
  borderRadius: '$md',
  background:
    "url('https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/0b6dff13-b108-4fb5-886d-2f25f2497c00/original')",
  backgroundSize: 'cover',
  opacity: 0.1,
  transition: '0.3s all',

  variants: {
    selected: {
      true: {
        opacity: 1,
        background: 'none',
      },
    },
  },
});

const Header = styled('div', {
  display: 'block',
  position: 'absolute',
  transition: '0.3s all',

  top: '50%',
  left: '50%',
  transform: ' translate(-50%, -50%)',
});

const Wrapper = styled('div', {
  display: 'flex',
  position: 'relative',
  borderRadius: '$md',
  border: '1px solid $primary',
  cursor: 'pointer',

  '&:hover': {
    [`${BackgroundImage}`]: {
      opacity: 0.25,
    },
    [`${Header}`]: {
      opacity: 1,
    },
  },

  variants: {
    selected: {
      true: {
        [`${Header}`]: {
          opacity: 0,
        },
      },
    },
    error: {
      true: {
        border: '2px solid red',
      },
    },
    size: {
      fullWidth: {
        width: '100%',
        minHeight: '75px',
      },
      xs: {
        width: '100px',
      },
      sm: {
        width: '200px',
      },
    },
  },

  defaultVariants: {
    size: 'fullWidth',
  },
});
export type MapLayerPlaceholderVariants = Stitches.VariantProps<typeof Wrapper>;

interface MapLayerPlaceholderProps {
  image?: PbImage;
  titleSelected?: string;
  titleNotSelected?: string;
  moreInfo?: string;
  error?: boolean;
  onClick?: () => void;
  size?: MapLayerPlaceholderVariants['size'];
}

const MapLayerPlaceholder: React.FC<MapLayerPlaceholderProps> = ({
  image,
  titleSelected,
  titleNotSelected,
  moreInfo,
  onClick,
  error,
  size,
}) => {
  const selected = !!image;

  return (
    <Wrapper onClick={onClick} selected={selected} error={error} size={size}>
      <BackgroundImage
        src={image?.baseUrl ? `${image?.baseUrl}/original` : undefined}
        selected={selected}
      />
      <Header>
        <TitleH4 color={error ? 'danger' : undefined}>
          {selected ? titleSelected : titleNotSelected}
        </TitleH4>
        {moreInfo && <Text size="sm">({moreInfo})</Text>}
      </Header>
    </Wrapper>
  );
};

export default MapLayerPlaceholder;
