import React, { PropsWithChildren, useMemo } from 'react';
import Layout from './Layout';
import LeftNavbarAdmin from '../LeftNavbar/LeftNavbarAdmin';
import { useUserRole } from '../../hooks/useUserRole';
import { UserRole } from '../../utils/auth/userUtils';
import LeftNavbar from '../LeftNavbar/LeftNavbar';

interface AdminLayoutProps extends PropsWithChildren {
  moderatorsAllowed?: boolean;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ moderatorsAllowed = false, children }) => {
  const role = useUserRole();

  const unauthorizedMessage = useMemo(() => {
    if (moderatorsAllowed && role === UserRole.Moderator) return undefined;
    if (role === UserRole.Admin) return undefined;

    return `Page is available only for admins${moderatorsAllowed ? ' and moderators' : ''}.`;
  }, [moderatorsAllowed, role]);

  if (unauthorizedMessage) {
    return (
      <Layout mandatoryLogin={false} vertical={true} navbar={<LeftNavbar />}>
        {unauthorizedMessage}
      </Layout>
    );
  }

  return (
    <Layout mandatoryLogin={true} vertical={true} navbar={<LeftNavbarAdmin />}>
      {children}
    </Layout>
  );
};

export default AdminLayout;
