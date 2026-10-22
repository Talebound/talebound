import React, { PropsWithChildren, useMemo } from 'react';
import Stitches, { CSSProperties } from '@stitches/react';
import { TitleH2 } from '../Typography/Title';
import { styled } from '../../styles/stitches.config';
import Loading from '../Loading/Loading';
import { Text } from '../Typography/Text';
import Link from 'next/link';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';
import { Row } from '../Flex/Flex';

export const SECTION_CORNER_IMAGE = (url: string) => ({
  backgroundImage: `linear-gradient(to bottom left, transparent 0%, rgba(255,255,255,0.65) 25%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 50%), url('${imageModifyVariant(
    url,
    ImageVariant['600x400'],
  )}')`,
});

const StyledSection = styled('section', {
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  boxShadow: '$sm',
  backgroundColor: 'white',
  padding: '$md',
  margin: '$sm',
  gap: '$sm',
  justifyContent: 'flex-start',
  transition: 'opacity 0.3s ease-in-out',

  variants: {
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    transparent: {
      true: {
        boxShadow: 'none',
        backgroundColor: '$transparent',
      },
    },
    noMargin: {
      true: {
        margin: 0,
      },
    },
    noPadding: {
      true: {
        padding: 0,
      },
    },
    highlighted: {
      true: {
        outline: '2px solid $primary',
        opacity: 0.8,
      },
    },
    semiTransparent: {
      true: {
        opacity: 0.5,
      },
    },
    error: {
      true: {
        outline: '2px solid $danger',
      },
    },
    hasShadow: {
      false: {
        boxShadow: 'none',
      },
    },
    hasCornerImage: {
      true: {
        overflow: 'hidden',
        backgroundPosition: 'top right, top right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '600px 400px',
      },
    },
    cornerImageSize: {
      w100: {
        backgroundSize: '100px 67px',
      },
      w200: {
        backgroundSize: '200px 134px',
      },
      w300: {
        backgroundSize: '300px 200px',
      },
      w400: {
        backgroundSize: '400px 267px',
      },
      w500: {
        backgroundSize: '500px 334px',
      },
      w600: {
        backgroundSize: '600px 400px',
      },
      w900: {
        backgroundSize: '900px 600px',
      },
      h100: {
        backgroundSize: '67px 100px',
      },
      h200: {
        backgroundSize: '134px 200px',
      },
      h300: {
        backgroundSize: '200px 300px',
      },
      h400: {
        backgroundSize: '267px 400px',
      },
      h600: {
        backgroundSize: '400px 600px',
      },
      h900: {
        backgroundSize: '600px 900px',
      },
    },
  },
});

export type StyledSectionVariants = Stitches.VariantProps<typeof StyledSection>;

const LoadingOverlay = styled('section', {
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  boxShadow: '$sm',
  backgroundColor: '$transparent80',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$md',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
});

const StyledSectionContent = styled('div', {
  display: 'flex',
  alignItems: '$$alignItems',
  justifyContent: '$$justifyContent',
  flexBasis: '$$flexBasis',
  flexWrap: '$$flexWrap',
  gap: '$md',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
  },
});

interface ContentSectionProps extends PropsWithChildren, StyledSectionVariants {
  direction?: 'row' | 'column';
  header?: string;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  flexBasis?: CSSProperties['flexBasis'];
  flexWrap?: CSSProperties['flexWrap'];
  loading?: boolean;
  href?: string;
  cornerImage?: string;
  highlighted?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  titlePrefix?: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  direction = 'column',
  header,
  alignItems = 'flex-start',
  justifyContent = 'flex-start',
  children,
  flexBasis,
  flexWrap,
  loading,
  cornerImage,
  href,
  highlighted,
  error,
  fullWidth,
  titlePrefix,
  ...styledSectionProps
}) => {
  const cornerImageCss = useMemo(
    () => (cornerImage ? SECTION_CORNER_IMAGE(cornerImage) : undefined),
    [cornerImage],
  );

  const hasChildren = !!children;

  return (
    <StyledSection
      fullWidth={fullWidth}
      highlighted={highlighted}
      error={error}
      hasCornerImage={!!cornerImage}
      css={cornerImageCss}
      {...styledSectionProps}
    >
      <Row gap="sm">
        {titlePrefix}
        {header && href && (
          <Link href={href}>
            <TitleH2 marginBottom={hasChildren ? 'md' : 'none'}>{header}</TitleH2>
          </Link>
        )}
        {header && !href && <TitleH2 marginBottom={hasChildren ? 'md' : 'none'}>{header}</TitleH2>}
      </Row>
      {hasChildren && (
        <StyledSectionContent
          direction={direction}
          css={{
            $$alignItems: alignItems,
            $$justifyContent: justifyContent,
            $$flexBasis: flexBasis,
            $$flexWrap: flexWrap,
          }}
        >
          {children}
        </StyledSectionContent>
      )}
      {loading && (
        <LoadingOverlay>
          <Loading size="sm" />
          <Text i>Loading...</Text>
        </LoadingOverlay>
      )}
    </StyledSection>
  );
};

export default ContentSection;
