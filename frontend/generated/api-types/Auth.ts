/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  PbLoginUserRequest,
  PbLoginUserResponse,
  PbResetPasswordSendCodeRequest,
  PbResetPasswordSendCodeResponse,
  PbResetPasswordVerifyCodeRequest,
  PbResetPasswordVerifyCodeResponse,
  PbResetPasswordVerifyCodeValidityResponse,
  PbVerifyEmailRequest,
  PbVerifyEmailResponse,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description auth user email
   *
   * @tags Auth
   * @name AuthVerifyEmail
   * @summary Verify email
   * @request POST:/auth
   * @response `200` `PbVerifyEmailResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  authVerifyEmail = (body: PbVerifyEmailRequest, params: RequestParams = {}) =>
    this.http.request<PbVerifyEmailResponse, RpcStatus>({
      path: `/auth`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description login user - get user object and set HttpOnly cookies
   *
   * @tags Auth
   * @name AuthLoginUser
   * @summary Login user
   * @request POST:/auth/login
   * @response `200` `PbLoginUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  authLoginUser = (body: PbLoginUserRequest, params: RequestParams = {}) =>
    this.http.request<PbLoginUserResponse, RpcStatus>({
      path: `/auth/login`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description logout user - it clears HttpOnly cookies - no request data required
   *
   * @tags Auth
   * @name AuthLogoutUser
   * @summary Logout user
   * @request POST:/auth/logout
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  authLogoutUser = (body: object, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/auth/logout`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description in case a user forgot their password, they can confirm the password reset using this endpoint
   *
   * @tags Auth
   * @name AuthResetPasswordVerifyCode
   * @summary Confirm password reset
   * @request POST:/auth/reset/auth-code
   * @response `200` `PbResetPasswordVerifyCodeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  authResetPasswordVerifyCode = (
    body: PbResetPasswordVerifyCodeRequest,
    params: RequestParams = {},
  ) =>
    this.http.request<PbResetPasswordVerifyCodeResponse, RpcStatus>({
      path: `/auth/reset/auth-code`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description validate reset password secret code
   *
   * @tags Auth
   * @name AuthResetPasswordVerifyCodeValidity
   * @summary Validate reset password secret code
   * @request GET:/auth/reset/auth-code-validity
   * @response `200` `PbResetPasswordVerifyCodeValidityResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  authResetPasswordVerifyCodeValidity = (
    query?: {
      secretCode?: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbResetPasswordVerifyCodeValidityResponse, RpcStatus>({
      path: `/auth/reset/auth-code-validity`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * @description in case a user forgot their password, they can request a password reset using this endpoint
   *
   * @tags Auth
   * @name AuthResetPasswordSendCode
   * @summary Request password reset
   * @request POST:/auth/reset/send-code
   * @response `200` `PbResetPasswordSendCodeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  authResetPasswordSendCode = (body: PbResetPasswordSendCodeRequest, params: RequestParams = {}) =>
    this.http.request<PbResetPasswordSendCodeResponse, RpcStatus>({
      path: `/auth/reset/send-code`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
