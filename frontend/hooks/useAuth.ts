import { PbUser } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useCookies } from 'react-cookie';
import { CookieMap } from '../utils/cookies/cookieMap';
import { useEffect, useMemo } from 'react';
import { setUser } from '../utils/auth/userSlice';

export type Auth = {
  user: PbUser | undefined;
  isLoggedIn: boolean;
};

export function useAuth(): Auth {
  const dispatch = useAppDispatch();
  const [cookies] = useCookies<string, CookieMap>(['access_token_present']);

  const user = useAppSelector((state: ReduxState) => state.auth.user);
  const isLoggedIn = cookies.access_token_present ?? false;

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setUser(undefined));
    }
  }, [dispatch, isLoggedIn]);

  return useMemo(() => ({ user, isLoggedIn: isLoggedIn }), [user, isLoggedIn]);
}
