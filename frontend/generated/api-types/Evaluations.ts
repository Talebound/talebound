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
  PbGetEvaluationByIdResponse,
  PbGetEvaluationsByTypeResponse,
  RpcStatus,
} from './data-contracts';
import { HttpClient, RequestParams } from './http-client';

export class Evaluations<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description get evaluation by id
   *
   * @tags Evaluations
   * @name EvaluationsGetEvaluationById
   * @summary Get evaluation by id
   * @request GET:/evaluations/id/{id}
   * @response `200` `PbGetEvaluationByIdResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  evaluationsGetEvaluationById = (id: number, params: RequestParams = {}) =>
    this.http.request<PbGetEvaluationByIdResponse, RpcStatus>({
      path: `/evaluations/id/${id}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * @description get evaluations by type
   *
   * @tags Evaluations
   * @name EvaluationsGetEvaluationsByType
   * @summary Get evaluations by type
   * @request GET:/evaluations/type/{type}
   * @response `200` `PbGetEvaluationsByTypeResponse` A successful response.
   * @response `default` `RpcStatus` An unexpected error response.
   */
  evaluationsGetEvaluationsByType = (type: 'self' | 'dm', params: RequestParams = {}) =>
    this.http.request<PbGetEvaluationsByTypeResponse, RpcStatus>({
      path: `/evaluations/type/${type}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
}
