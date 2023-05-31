import express from 'express';

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
    created: []
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
    value: TObject,
    original = false,
    meta_?: ResponseMeta,
    options = {
      onlyKeys: true
    }
  ): Response {
    try {
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

      if (original) response = value;

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromCreated(
    value: TObject,
    meta_?: ResponseMeta,
    options = {
      onlyKeys: true
    }
  ): Response {
    try {
      let response: any = {};

      const meta = meta_ ? meta_ : new ResponseMeta(201, 'Created');

      if (options.onlyKeys && !!Response.allowed.created?.length) {
        Response.allowed.created.forEach(key => {
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

  public static fromQuery(value: MongoResponse, meta_?: ResponseMeta): Response {
    const pagination = ResponsePagination.fromMongoQuery(value);

    const meta = meta_ ? meta_ : new ResponseMeta(200);

    let response: any;

    if (value?.response?.length) response = value.response;
    else {
      response = [];

      meta.message = 'No response';
    }

    return new Response(response, meta, pagination);
  }

  public static fromAny(value: any, meta_?: ResponseMeta): Response {
    let response: any;

    let meta = meta_ ? meta_ : new ResponseMeta(200);

    if (value !== undefined) response = value;
    else {
      meta.message = 'No result';
    }

    return new Response(response, meta);
  }

  public static fromExpress(res: express.Response, data = {}, status = 200) {
    return res.status(status).json(data);
  }
}
