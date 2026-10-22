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
  PbGetMenuItemContentResponse,
  PbGetMenuItemsResponse,
  PbMenuItem,
  PbViewMenu,
  RpcStatus,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Menus<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description gets list of entities for menu item - posts, maps, locations,...
   *
   * @tags Menus
   * @name MenusGetMenuItemContent
   * @summary Get all entities for menu item
   * @request GET:/menus/items/content/{menuItemId}
   * @response `200` `PbGetMenuItemContentResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusGetMenuItemContent = (menuItemId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMenuItemContentResponse, RpcStatus>({
      path: `/menus/items/content/${menuItemId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description gets menu by ID
   *
   * @tags Menus
   * @name MenusGetMenu
   * @summary Get menu by ID
   * @request GET:/menus/{menuId}
   * @response `200` `PbViewMenu` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusGetMenu = (menuId: number, params: RequestParams = {}) =>
    this.http.request<PbViewMenu, RpcStatus>({
      path: `/menus/${menuId}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description updates menu (code or image)
   *
   * @tags Menus
   * @name MenusUpdateMenu
   * @summary Update Menu
   * @request PATCH:/menus/{menuId}
   * @response `200` `PbViewMenu` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusUpdateMenu = (
    menuId: number,
    body: {
      code?: string;
      /** @format int32 */
      headerImgId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbViewMenu, RpcStatus>({
      path: `/menus/${menuId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description move menu item group up
   *
   * @tags Menus
   * @name MenusUpdateMenuItemMoveGroupUp
   * @summary Move menu item group up
   * @request PATCH:/menus/{menuId}/groups/{menuItemId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusUpdateMenuItemMoveGroupUp = (
    menuId: number,
    menuItemId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<object, RpcStatus>({
      path: `/menus/${menuId}/groups/${menuItemId}`,
      method: 'PATCH',
      format: 'json',
      ...params,
    });
  /**
   * @description gets list of menu items
   *
   * @tags Menus
   * @name MenusGetMenuItems
   * @summary Get menu items
   * @request GET:/menus/{menuId}/items
   * @response `200` `PbGetMenuItemsResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusGetMenuItems = (menuId: number, params: RequestParams = {}) =>
    this.http.request<PbGetMenuItemsResponse, RpcStatus>({
      path: `/menus/${menuId}/items`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description adds new menu item to the menu
   *
   * @tags Menus
   * @name MenusCreateMenuItem
   * @summary Create menu item
   * @request POST:/menus/{menuId}/items
   * @response `200` `PbMenuItem` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusCreateMenuItem = (
    menuId: number,
    body: {
      code?: string;
      name?: string;
      /** @format int32 */
      position?: number;
      isMain?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMenuItem, RpcStatus>({
      path: `/menus/${menuId}/items`,
      method: 'POST',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * @description deletes menu item
   *
   * @tags Menus
   * @name MenusDeleteMenuItem
   * @summary Delete menu item
   * @request DELETE:/menus/{menuId}/items/{menuItemId}
   * @response `200` `object` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusDeleteMenuItem = (menuId: number, menuItemId: number, params: RequestParams = {}) =>
    this.http.request<object, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * @description updates menu item
   *
   * @tags Menus
   * @name MenusUpdateMenuItem
   * @summary Update menu item
   * @request PATCH:/menus/{menuId}/items/{menuItemId}
   * @response `200` `PbMenuItem` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  menusUpdateMenuItem = (
    menuId: number,
    menuItemId: number,
    body: {
      code?: string;
      name?: string;
      /** @format int32 */
      position?: number;
      isMain?: boolean;
      /** @format int32 */
      descriptionPostId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<PbMenuItem, RpcStatus>({
      path: `/menus/${menuId}/items/${menuItemId}`,
      method: 'PATCH',
      body: body,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
