import express from 'express';

import { Base } from './base';
import { TObject } from './models';
import { MongoQuery } from './mongo-query';
import { IResponseMeta, ResponseMeta } from './response-meta';
import { IResponsePagination, ResponsePagination } from './response-pagination';

export interface IResponse {
  meta: IResponseMeta;
  pagination: IResponsePagination;
  response: any;
}

export class Response extends Base {

  constructor(
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
    original = false
  ): Response {
    try {
      let response: any = {};
      const allowedKeys = ['_id', 'meta', 'data', 'api_meta'];

      const meta = new ResponseMeta(200);

      allowedKeys.forEach(key => {
        if (
          value?.hasOwnProperty(key) &&
          value[key] !== undefined
        ) response[key] = value[key];
      });

      if (original) response = value;

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromCreated(value: TObject): Response {
    try {
      const response: any = {};

      const meta = new ResponseMeta(201, 'Created');

      if (value._id) response._id = value._id;
      if (value.api_meta) response.api_meta = value.api_meta;

      return new Response(response, meta);
    }
    catch (error) {
      throw error;
    }
  }

  public static fromQuery(value: MongoQuery): Response {
    const pagination = ResponsePagination.fromMongoQuery(value);

    const meta = new ResponseMeta(200);

    let response: any;

    if (value?.response?.length) response = value.response;
    else {
      response = [];

      meta.message = 'No response';
    }

    return new Response(response, meta, pagination);
  }

  public static fromAny(value: any, moreMeta?: any): Response {
    let response: any;

    let meta = new ResponseMeta(200);

    if (value !== undefined) response = value;
    else {
      meta.message = 'No result';
    }

    if (typeof moreMeta === 'object') meta = { ...meta, ...moreMeta };

    return new Response(response, meta);
  }

  public static fromExpress(res: express.Response, data = {}, status = 200) {
    return res.status(status).json(data);
  }
}
