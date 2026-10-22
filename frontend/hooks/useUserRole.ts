import { ReduxState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { setUserRole } from '../utils/auth/userSlice';
import { useGetUserRoles } from '../api/users/useGetUserRoles';
import { isUserRole, UserRole } from '../utils/auth/userUtils';

export function useUserRole(): UserRole {
  const dispatch = useDispatch();
  const userId = useSelector((state: ReduxState) => state.auth.user?.id);
  const userRole = useSelector((state: ReduxState) => state.auth.role);

  const { data: roles } = useGetUserRoles({
    variables: userId ?? 0,
  });

  useEffect(() => {
    if (!roles || !userId) {
      dispatch(setUserRole(undefined));
      return;
    }
    if (roles.length === 0) {
      //no special role was found
      dispatch(setUserRole(UserRole.User));
    } else if (roles.length === 1) {
      const role = roles[0].id ?? -1;
      if (isUserRole(role)) {
        dispatch(setUserRole(role));
      } else {
        throw new Error(
          `Invalid role ${role} - Id: ${roles[0].id}, Name: ${roles[0].name}, Description: ${roles[0].description} `,
        );
      }
    } else {
      throw new Error('Multiple roles not supported.');
    }
  }, [dispatch, roles, userId]);

  return useMemo(() => userRole ?? UserRole.User, [userRole]);
}
