import React from 'react';
import Link from 'next/link';
import { SiDiscord, SiGithub, SiKofi, SiYoutube } from 'react-icons/si';
import Logo from '../../components/Logo/Logo';
import { styled } from '../../styles/stitches.config';
import { TitleH5 } from '../../components/Typography/Title';
import { Text } from '../../components/Typography/Text';

const FooterDiv = styled('div', {
  width: '100%',
  minHeight: '150px',
  backgroundColor: '$black',
  maskImage: 'linear-gradient(200deg, rgba(255, 255, 255, 0) -200%, #ffffff 100%)',
  color: '$white',
  padding: '$md',
  display: 'flex',
  flexDirection: 'column',
  float: 'bottom',
});

const FooterContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',

  [`& a`]: {
    color: '$link2',
    transition: 'opacity 0.2s ease-in-out',
  },
  [`& a:hover`]: {
    opacity: '0.7',
  },

  '@lg': {
    flexDirection: 'row',
  },
});

const LogoWrapper = styled('div', {
  display: 'flex',
  padding: '$sm',
  minWidth: '390px',
  justifyContent: 'center',

  '@smMax': {
    minWidth: '0px',
  },
});

const LinkColumnWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$xl',
  flexGrow: 1,
  justifyContent: 'space-evenly',

  '@xs': {
    flexDirection: 'row',
  },

  '@xsMax': {
    borderTop: '1px solid $white',
    borderBottom: '1px solid $white',
    paddingTop: '$md',
    paddingBottom: '$md',
  },
});

const LinkColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
  minWidth: '10rem',
});

const FooterAvatar = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '.5rem',
  padding: '$sm',
  minWidth: '390px',

  '@xsMax': {
    flexDirection: 'column',
  },
  '@smMax': {
    minWidth: '0px',
  },
  '@sm': {
    justifyContent: 'flex-end',
  },

  [`& > a > img`]: {
    borderRadius: '50%',
    width: '$md !important',
    height: '$md !important',
  },
});

const FooterIcons = styled('div', {
  display: 'flex',
  gap: '$md',
  fontSize: '$xl',
});

const Footer: React.FC = () => {
  return (
    <FooterDiv>
      <FooterContent>
        <LogoWrapper>
          <Logo size="7rem" />
        </LogoWrapper>
        <LinkColumnWrapper>
          <LinkColumn>
            <TitleH5 underline={false} css={{ color: '$primary600', textTransform: 'uppercase' }}>
              Talebound
            </TitleH5>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </LinkColumn>
          <LinkColumn>
            <TitleH5 underline={false} css={{ color: '$primary600', textTransform: 'uppercase' }}>
              Terms
            </TitleH5>
            <Link href="/privacy-policy">Privacy policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </LinkColumn>
          <LinkColumn>
            <TitleH5 underline={false} css={{ color: '$primary600', textTransform: 'uppercase' }}>
              How to play
            </TitleH5>
            <Link href="/how-to/basics">Basics</Link>
            <Link href="/how-to/world-differences">World differences</Link>
          </LinkColumn>
        </LinkColumnWrapper>
        <FooterAvatar>
          <FooterIcons>
            <Link href="https://discord.gg/wWsXB5gVmY" target="_blank">
              <SiDiscord />
            </Link>
            <Link href="https://www.youtube.com/@Talebound" target="_blank">
              <SiYoutube />
            </Link>
            <Link href="https://github.com/Talebound" target="_blank">
              <SiGithub />
            </Link>
            <Link href="https://ko-fi.com/talebound" target="_blank">
              <SiKofi />
            </Link>
          </FooterIcons>
          <Link href="https://github.com/the-medo" target="_blank">
            <Text color="white">by Medo</Text>
          </Link>
          <Link href="https://github.com/the-medo" target="_blank">
            <img src="https://avatars.githubusercontent.com/u/8963255?s=60&v=4" alt="the-medo" />
          </Link>
          <Text color="white" css={{ height: '20px' }}>
            © {new Date().getFullYear()} Talebound
          </Text>
        </FooterAvatar>
      </FooterContent>
    </FooterDiv>
  );
};

export default Footer;
