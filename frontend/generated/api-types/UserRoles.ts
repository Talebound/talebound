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

import { PbGetUserRolesResponse, RpcStatus } from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class UserRoles<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description returns full list of user roles
   *
   * @tags Users
   * @name UsersGetUserRoles
   * @summary Get user roles (admin, moderator, etc.)
   * @request GET:/user_roles
   * @response `200` `PbGetUserRolesResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersGetUserRoles = (
    query?: {
      /** @format int32 */
      userId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbGetUserRolesResponse, RpcStatus>({
      path: `/user_roles`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
