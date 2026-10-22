import React, { PropsWithChildren, useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Header from '../../component-sections/header/Header';
import Footer from '../../component-sections/footer/Footer';
import HomepageHeader from '../../component-sections/homepage/HomepageHeader';
import { Client } from 'react-hydration-provider';
import { styled } from '../../styles/stitches.config';

const PageWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const ContentWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  padding: '$sm',

  variants: {
    vertical: {
      true: {
        flexDirection: 'column',
      },
    },
    centered: {
      true: {
        justifyContent: 'center',
      },
    },
  },
});

interface LayoutProps extends PropsWithChildren {
  mandatoryLogin?: boolean;
  mandatoryLoggedOut?: boolean;
  vertical?: boolean;
  centered?: boolean;
  navbar?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  mandatoryLogin,
  mandatoryLoggedOut,
  vertical,
  centered,
  navbar,
  children,
}) => {
  const { isLoggedIn } = useAuth();

  const unauthorizedMessage = useMemo(() => {
    if (mandatoryLogin && !isLoggedIn) {
      return 'Please log in to view this page.';
    } else if (mandatoryLoggedOut && isLoggedIn) {
      return 'Page not available for logged in users.';
    }
    return undefined;
  }, [mandatoryLogin, mandatoryLoggedOut, isLoggedIn]);

  return (
    <PageWrapper>
      <Client>
        {isLoggedIn && <Header />}
        {!isLoggedIn && <HomepageHeader />}
      </Client>
      <ContentWrapper>
        {navbar && <Client>{navbar}</Client>}
        <Content vertical={vertical} centered={centered}>
          <Client>{unauthorizedMessage ?? children}</Client>
        </Content>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
