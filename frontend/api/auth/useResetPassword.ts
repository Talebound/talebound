import { createMutation } from 'react-query-kit';
import {
  PbResetPasswordSendCodeRequest,
  PbResetPasswordVerifyCodeRequest,
} from '../../generated/api-types/data-contracts';
import { AuthCollection } from '../collections';

export const useResetPassword = createMutation({
  mutationFn: async (variables: PbResetPasswordSendCodeRequest) =>
    AuthCollection.authResetPasswordSendCode(variables),
});

export const useResetPasswordVerifyCode = createMutation({
  mutationFn: async (variables: PbResetPasswordVerifyCodeRequest) =>
    AuthCollection.authResetPasswordVerifyCode(variables),
});

export const useResetPasswordVerifyCodeValidity = createMutation({
  mutationFn: async (code: string) =>
    AuthCollection.authResetPasswordVerifyCodeValidity({
      secretCode: code,
    }),
});
