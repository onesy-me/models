import express from 'express';

import { is } from '@onesy/utils';

import { Base } from './base';
import { TObject } from './models';
import { MongoResponse } from './MongoResponse';
import { IResponseMeta, ResponseMeta } from './ResponseMeta';
import { IResponsePagination, ResponsePagination } from './ResponsePagination';

export interface IResponse {
  meta: IResponseMeta;
  pagination: IResponsePagination;
  response: any;
}

export class Response extends Base {
  public static allowed = {
    object: [],
    added: [],
    updated: [],
    removed: []
  };

  public constructor(
    public response: any,
    public meta: ResponseMeta,
    public pagination?: ResponsePagination
  ) {
    super();

    if (meta?.clean) meta.clean();

    if (pagination?.clean) pagination.clean();

    this.clean();
  }

  public static fromObject(
    value_: TObject,
    meta_?: ResponseMeta,
    options = {
      onlyKeys: true,
      original: false
    },
    req?: any
  ): Response {
    try {
      const value = Response.value(value_, req);

      let response: any = {};

      const meta = meta_ ? meta_ : new ResponseMeta(200);

      if (options?.onlyKeys && !!Response.allowed?.object?.length) {
        Response.allowed.object.forEach(key => {
          if (
            value?.hasOwnProperty(key) &&
            value[key] !== undefined
          ) response[key] = value[key];
        });
      }
      else response = { ...value };

      if (options.original) response = value;

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromAdded(
    value_: TObject,
    meta_?: ResponseMeta,
    options = {
      onlyKeys: true,
      original: false
    },
    req?: any
  ): Response {
    try {
      const value = Response.value(value_, req);

      let response: any = {};

      const meta = meta_ ? meta_ : new ResponseMeta(201, 'Added');

      if (options.onlyKeys && !!Response.allowed.added?.length) {
        Response.allowed.added.forEach(key => {
          if (
            value?.hasOwnProperty(key) &&
            value[key] !== undefined
          ) response[key] = value[key];
        });
      }
      else response = { ...value };

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromUpdated(
    value_: TObject,
    meta_?: ResponseMeta,
    options = {
      onlyKeys: true,
      original: false
    },
    req?: any
  ): Response {
    try {
      const value = Response.value(value_, req);

      let response: any = {};

      const meta = meta_ ? meta_ : new ResponseMeta(200, 'Updated');

      if (options.onlyKeys && !!Response.allowed.updated?.length) {
        Response.allowed.updated.forEach(key => {
          if (
            value?.hasOwnProperty(key) &&
            value[key] !== undefined
          ) response[key] = value[key];
        });
      }
      else response = { ...value };

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromRemoved(
    value_: TObject,
    meta_?: ResponseMeta,
    options = {
      onlyKeys: true,
      original: false
    },
    req?: any
  ): Response {
    try {
      const value = Response.value(value_, req);

      let response: any = {};

      const meta = meta_ ? meta_ : new ResponseMeta(200, 'Removed');

      if (options.onlyKeys && !!Response.allowed.removed?.length) {
        Response.allowed.removed.forEach(key => {
          if (
            value?.hasOwnProperty(key) &&
            value[key] !== undefined
          ) response[key] = value[key];
        });
      }
      else response = { ...value };

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromQuery(value: MongoResponse, meta_?: ResponseMeta, req?: any): Response {
    const pagination = ResponsePagination.fromMongoQuery(value);

    const meta = meta_ ? meta_ : new ResponseMeta(200);

    let response: any;

    if (value?.response?.length) response = value.response.map(item => Response.value(item, req));
    else {
      response = [];

      if (!meta.message) meta.message = 'No response';
    }

    if (value.options) meta.options = value.options;

    return new Response(response, meta, pagination);
  }

  public static fromAny(value: any, meta_?: ResponseMeta, req?: any): Response {
    let response: any;

    let meta = meta_ ? meta_ : new ResponseMeta(200);

    if (value !== undefined) response = value;
    else if (!meta.message) meta.message = 'No result';

    return new Response(response, meta);
  }

  public static fromExpress(res: express.Response, data = {}, status = 200, req: any) {
    return res.status(status).json(data);
  }

  public static value(value: any, req?: any) {
    // value simple
    if (is('simple', value)) return value;

    // Getter object method
    if (is('function', value?.toObjectResponse)) return value.toObjectResponse(req);

    return { ...value };
  }
}
