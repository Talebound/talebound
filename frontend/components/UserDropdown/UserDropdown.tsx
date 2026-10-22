import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useLogout } from '../../api/auth/useLogout';
import { resetAuth } from '../../utils/auth/userSlice';
import { DropdownMenuContent } from '../../components-radix-ui/DropdownMenu/DropdownMenuContent';
import { DropdownMenuItem } from '../../components-radix-ui/DropdownMenu/DropdownMenuItem';
import { DropdownMenuSeparator } from '../../components-radix-ui/DropdownMenu/DropdownMenuSeparator';
import Avatar from '../Avatar/Avatar';
import { DropdownMenuTrigger } from '../../components-radix-ui/DropdownMenu/DropdownMenuTrigger';
import { DropdownMenuRoot } from '../../components-radix-ui/DropdownMenu/DropdownMenuRoot';
import { DropdownMenuPortal } from '../../components-radix-ui/DropdownMenu/DropdownMenuPortal';
import { useImage } from '../../hooks/useImage';

const UserDropdown: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { image } = useImage(user?.imgId ?? 0);

  const logout = useLogout({
    onSuccess: () => {
      dispatch(resetAuth());
      void router.push('/');
    },
  });

  const openProfile = useCallback(() => {
    void router.push(`/user/${user?.id}/profile`);
  }, [router, user?.id]);

  const openSettings = useCallback(() => {
    void router.push('/user/settings');
  }, [router]);

  const handleLogout = useCallback(() => {
    logout.mutate();
  }, [logout]);

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger circle>
        <Avatar size="md" type="user" url={image?.url} />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent align={'end'} sideOffset={15}>
          <DropdownMenuItem padding="sm" onSelect={openProfile}>
            Signed in as&nbsp;<strong>{user?.username}</strong>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem padding="sm" onSelect={openSettings}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem padding="sm">Help & Feedback</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem padding="sm" onSelect={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default UserDropdown;
