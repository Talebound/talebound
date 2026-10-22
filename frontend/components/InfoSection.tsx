import React, { PropsWithChildren } from 'react';
import Link from 'next/link';
import { styled } from '../styles/stitches.config';

const Section = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '$xs',
  paddingLeft: '$sm',
  paddingRight: '$sm',
  alignItems: 'center',
  justifyContent: 'center',
});

const SectionContent = styled('div', {
  display: 'flex',
  fontSize: '$lg',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '$xs',
  borderRadius: '10px',
  backgroundColor: '$transparent40',

  variants: {
    background: {
      true: {
        backgroundColor: '$white',
      },
    },
  },

  ['a']: {
    fontSize: '$xs',
    // alignSelf: 'flex-end',
  },
});

interface InfoSectionProps extends PropsWithChildren {
  background?: boolean;
  title?: string;
  linkTitle?: string;
  linkHref?: string;
  linkAction?: () => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  background,
  title,
  linkTitle,
  linkHref,
  linkAction,
  children,
}) => {
  return (
    <Section>
      {title && <span>{title}</span>}
      <SectionContent background={background}>
        {children}
        <>
          {linkTitle && linkHref && <Link href={linkHref}>{linkTitle}</Link>}
          {linkTitle && !linkHref && linkAction && <a onClick={linkAction}>{linkTitle}</a>}
        </>
      </SectionContent>
    </Section>
  );
};

export default InfoSection;
