import React, { PropsWithChildren, Suspense, useMemo } from 'react';
import Layout from './Layout';
import LeftNavbarModule from '../LeftNavbar/LeftNavbarModule';
import ActionBoxModule from '../../screens/modules/ActionBoxModule';
import ModuleOpened from '../../screens/modules/ModuleOpened';
import { useUrlModuleId } from '../../hooks/useUrlModuleId';

const ModuleLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const moduleId = useUrlModuleId();

  const navbar = useMemo(
    () => (
      <Suspense fallback={null}>
        <LeftNavbarModule moduleId={moduleId} />
      </Suspense>
    ),
    [moduleId],
  );

  return (
    <Layout vertical={true} navbar={navbar}>
      {moduleId && (
        <Suspense fallback={null}>
          <ModuleOpened moduleId={moduleId} />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <ActionBoxModule moduleId={moduleId} />
      </Suspense>
      <Suspense fallback={null}>{children}</Suspense>
    </Layout>
  );
};

export default ModuleLayout;
