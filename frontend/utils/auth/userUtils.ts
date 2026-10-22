export enum UserRole {
  User = 0,
  Admin = 1,
  Moderator = 2,
}

const userRoleArray = Object.values(UserRole) as Array<UserRole>;

export const isUserRole = (role: number): role is UserRole => userRoleArray.includes(role);

export const isAtLeastModerator = (role: UserRole) =>
  role === UserRole.Moderator || role === UserRole.Admin;
