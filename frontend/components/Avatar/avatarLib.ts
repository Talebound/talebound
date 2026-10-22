import { DEFAULT_AVATAR_URL } from '../../utils/constants';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type AvatarType = 'unknown' | 'user' | 'character' | 'world' | 'ruleset';

export const emptyUrlByType: Record<AvatarType, string | undefined> = {
  unknown: undefined,
  user: DEFAULT_AVATAR_URL,
  character: DEFAULT_AVATAR_URL,
  world: undefined,
  ruleset: undefined,
};
