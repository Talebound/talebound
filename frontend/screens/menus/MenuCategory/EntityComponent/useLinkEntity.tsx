import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../../store';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface UseLinkEntity {
  component: React.ComponentType;
  url: string;
  callback: () => void;
}

const useLinkEntity = (entityId: number, validGlobal: boolean = true) => {
  const router = useRouter();
  const openedUrlPrefix = useSelector((state: ReduxState) => state.menuCategory.openedUrlPrefix);
  const url = `${openedUrlPrefix}/${entityId}#content`;

  const LinkEntity = useMemo(() => {
    const C = ({ children, valid = true }: { children: React.ReactNode; valid?: boolean }) =>
      valid && validGlobal ? (
        <Link href={url} scroll={false}>
          {children}
        </Link>
      ) : (
        children
      );
    C.displayName = 'LinkEntity';
    return C;
  }, [url, validGlobal]);

  const callback = useCallback(() => {
    if (!validGlobal) return;
    void router.push(url);
  }, [router, url, validGlobal]);

  return {
    component: LinkEntity,
    url,
    callback,
  };
};

export default useLinkEntity;
