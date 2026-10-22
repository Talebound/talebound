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
  PbAddRoleToUserRequest,
  PbAddRoleToUserResponse,
  PbRemoveRoleFromUserResponse,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class UsersRoles<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description adds new role to user
   *
   * @tags Users
   * @name UsersAddRoleToUser
   * @summary Add role to user
   * @request POST:/users_roles
   * @response `200` `PbAddRoleToUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersAddRoleToUser = (body: PbAddRoleToUserRequest, params: RequestParams = {}) =>
    this.http.request<PbAddRoleToUserResponse, RpcStatus>({
      path: `/users_roles`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description removes role from user
   *
   * @tags Users
   * @name UsersRemoveRoleFromUser
   * @summary Remove role from user
   * @request DELETE:/users_roles/{userId}/roles/{roleId}
   * @response `200` `PbRemoveRoleFromUserResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  usersRemoveRoleFromUser = (userId: number, roleId: number, params: RequestParams = {}) =>
    this.http.request<PbRemoveRoleFromUserResponse, RpcStatus>({
      path: `/users_roles/${userId}/roles/${roleId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
}
