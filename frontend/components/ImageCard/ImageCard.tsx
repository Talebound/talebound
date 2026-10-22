import React from 'react';
import { styled } from '../../styles/stitches.config';
import { TitleH2, TitleH3 } from '../Typography/Title';
import { Col, Row } from '../Flex/Flex';
import { Text } from '../Typography/Text';
import TagRow from '../TagRow/TagRow';
import MiniStatistic from '../MiniStatistic/MiniStatistic';
import Link from 'next/link';
import { PbViewTag } from '../../generated/api-types/data-contracts';

const ImageBackground = styled(Col, {
  paddingTop: '$md',
  paddingBottom: '$md',
  paddingLeft: '$sm',
  paddingRight: '$sm',
  border: '1px solid $primary200',
  flexGrow: 1,
  minWidth: '350px',
  flexBasis: '350px',

  borderRadius: '$lg',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    background: '',
    zIndex: 0,
    borderRadius: '$lg',
  },

  variants: {
    compact: {
      true: {
        minWidth: '185px',
        flexBasis: '185px',
      },
    },
    selected: {
      true: {
        outline: '3px solid $primary200',
      },
    },
    grow: {
      false: {
        flexGrow: 0,
      },
    },
  },
});

export interface ImageCardStatSection {
  label: string;
  value: number;
}

export interface ImageCardPropsExtended {
  compact?: boolean;
  selected?: boolean;
  grow?: boolean;
  onClick?: () => void;
}

interface ImageCardProps extends ImageCardPropsExtended {
  imgSrc: string;
  href: string;
  title: string;
  basedOn: string;
  statSections: ImageCardStatSection[];
  availableTags: PbViewTag[];
  tags: number[];
}

const ImageCard: React.FC<ImageCardProps> = ({
  imgSrc,
  href,
  title,
  basedOn,
  statSections,
  availableTags,
  tags,
  compact = false,
  selected = false,
  onClick,
  grow = true,
}) => {
  const displayedTitle = title === '' || !title ? ' * empty * ' : title;

  return (
    <ImageBackground
      gap="sm"
      css={{
        '&::before': {
          backgroundImage: `linear-gradient(
            rgba(255, 255, 255, 1) 0px, 
            rgba(255, 255, 255, 0.7) 50px,
            rgba(255, 255, 255, 0) 170px,
            rgba(255, 255, 255, 0) 350px,
            rgba(255, 255, 255, 1) 351px 
            ), url(${imgSrc})`,
        },
      }}
      compact={compact}
      selected={selected}
      onClick={onClick}
      grow={grow}
    >
      <Col gap="xs" alignItems="center">
        <Link href={href}>
          {compact ? <TitleH3>{displayedTitle}</TitleH3> : <TitleH2>{displayedTitle}</TitleH2>}
        </Link>
        <Text size="sm" i>
          {basedOn.length > 0 ? `(based on ${basedOn})` : 'original'}
        </Text>
      </Col>
      <div style={{ height: compact ? '50px' : '100px' }}></div>
      <Row gap={compact ? 'xs' : 'sm'} justifyContent="around">
        {statSections.map((ss) => (
          <MiniStatistic key={ss.label} title={ss.label} value={ss.value} compact={compact} />
        ))}
      </Row>
      {!compact && (
        <>
          <div style={{ height: '0px' }}></div>
          <TagRow availableTags={availableTags} tagIds={tags} width={330} />
        </>
      )}
    </ImageBackground>
  );
};

ImageCard.displayName = 'ImageCard';

export default ImageCard;
