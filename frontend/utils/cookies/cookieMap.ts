enum PossibleCookies {
  ACCESS_TOKEN_PRESENT = 'access_token_present',
  REFRESH_TOKEN_PRESENT = 'refresh_token_present',
}

export type CookieMap = {
  [PossibleCookies.ACCESS_TOKEN_PRESENT]?: true;
  [PossibleCookies.REFRESH_TOKEN_PRESENT]?: true;
};
