import { createMutation } from 'react-query-kit';
import { UsersCollection } from '../collections';

export type UploadUserAvatarRequest = {
  userId: number;
  data: string;
};

export const useUploadUserAvatar = createMutation({
  mutationFn: async (variables: UploadUserAvatarRequest) =>
    UsersCollection.usersUploadUserAvatar(variables.userId, { data: variables.data }),
});
