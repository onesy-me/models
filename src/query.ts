import express from 'express';
import { Sort } from 'mongodb';

import is from '@amaui/utils/is';
import clamp from '@amaui/utils/clamp';
import decode from '@amaui/utils/decode';
import castParam from '@amaui/utils/castParam';
import unflattenObject from '@amaui/utils/unflattenObject';

import { Base } from './base';
import getExpressParamValue from './getExpressParamValue';
import validateMongoQuery from './validateMongoQuery';
import getMongoFilters from './getMongoFilters';

export type TMatchOperator = '$and' | '$or';

export type TMatch = {
  [p in TMatchOperator]: object;
};

export type TFilterOperator = 'less-than' | 'less-than-equal' | 'equal' | 'not-equal' | 'array-all' | 'array-some' | 'starts-with' | 'ends-with' | 'contains' | 'greater-than-equal' | 'greater-than';

export interface IFilter {
  field: string;
  operator: TFilterOperator;
  value: any;
}

export interface IQueryObject<T = object> {
  [p: string]: Array<T>;
}

export interface IRequestParams {
  path: object;
  query: object;
}

export interface IRequestParams {
  path: object;
  query: object;
}

export interface IQueryFind {
  [key: string]: object;
}

export type TQueryQueriesKey = 'search' | 'api' | 'permissions' | 'aggregate' | 'find';

export interface IQueryObjects {
  search?: IQueryObject;
  api?: IQueryObject;
  permissions?: IQueryObject;
  aggregate?: IQueryObject;
  find?: IQueryFind;
}

export interface IQuerySettings {
  type?: '$and' | '$or';
}

export type TQueryMetaProperty = 'limit' | 'total' | 'next' | 'previous' | 'sort' | 'skip';

const queryMetaProperties = ['limit', 'total', 'next', 'previous', 'sort', 'skip'];

export type IQueryMeta = {
  [p in TQueryMetaProperty]?: any;
};

export interface IKeys {
  allowed: string[];
}

export interface IQuery {
  query?: any;

  queries?: IQueryObjects;

  setting?: IQuerySettings;

  params?: IRequestParams;

  projection?: object;

  sort?: Sort;

  limit?: number;
  skip?: number;
  total?: boolean;
}

export class Query extends Base implements IQuery {
  public queries: IQueryObjects = {
    search: {},
    api: {},
    permissions: {},
    aggregate: {},
    find: {},
  };
  public query: any;
  public settings: IQuerySettings = { type: '$and' };
  public params: IRequestParams = { path: {}, query: {} };
  public limit = Query.limit;
  public skip = 0;
  public sort: Sort = Query.sort;
  public next: string | Record<string, any> = '';
  public previous: string | Record<string, any> = '';
  public total = false;
  public projection?: object;

  public static keys: IKeys = {
    allowed: [],
  };
  public static collections: string[] = [];
  public static limit = 15;
  public static LIMIT_MIN = 1;
  public static LIMIT_MAX = 40;
  public static sort: Sort = { 'api_meta.added_at': -1 };

  constructor(
    query?: IQuery
  ) {
    super();

    if (query?.queries) {
      if (query.queries.search) this.queries.search = query.queries.search;
      if (query.queries.api) this.queries.api = query.queries.api;
      if (query.queries.aggregate) this.queries.aggregate = query.queries.aggregate;
      if (query.queries.find) this.queries.find = query.queries.find;
    }

    this.getMeta(query);

    // Default empty array for each collection for each of the queries
    Query.collections.forEach(collection => Object.keys(this.queries).forEach(key => {
      if (!this.queries[key][collection]) this.queries[key][collection] = ['find'].indexOf(key) > -1 ? {} : [];
    }));
  }

  public getMeta(value: IQuery): IQueryMeta {
    const value_: IQueryMeta = {};

    if (is('object', value) || is('object-like', value)) {
      queryMetaProperties.forEach(property => {
        let type = property;

        if (['next', 'previous'].indexOf(property) > -1) type = 'paginator';

        if (this.hasOwnProperty(property) && value[property] !== undefined) this[property] = Query.getMetaValue(value[property], type);

        value_[property] = this[property];
      });
    }

    return value_;
  }

  public static getMetaValue(value: any, type = 'limit'): any {
    switch (type) {
      case 'limit':
        return is('number', value) ? clamp(value, Query.LIMIT_MIN, Query.LIMIT_MAX) : this.limit;

      case 'sort':
        return value;

      case 'paginator':
        return decode(value);

      case 'total':
        return !!castParam(value);

      case 'skip':
        return is('number', value) ? clamp(value, 0) : 0;

      default:
        return;
    }
  }

  public static fromRequest(req: express.Request): Query {
    const query = new Query();

    query.params.path = req.params;

    query.params.query = {};

    Object.keys(req.query).forEach(item => {
      // To decode properties that are flatten path with . notiation
      query.params.query[decodeURIComponent(item)] = decodeURIComponent(req.query[item] as string);
    });

    const objectFromQueryParams: any = unflattenObject(query.params.query);

    const requestQuery = req.body?.query || objectFromQueryParams?.query || {};

    // query
    query.query = requestQuery.query;

    query.settings = req.body?.settings || objectFromQueryParams.settings || { type: '$and' };

    if (requestQuery && Object.keys(requestQuery).length) {
      validateMongoQuery(requestQuery, Query.keys);

      query.queries.search = { ...query.queries.search, ...getMongoFilters(requestQuery) };
    }

    query.limit = getExpressParamValue(req, 'limit');
    query.skip = getExpressParamValue(req, 'skip');
    query.total = getExpressParamValue(req, 'total');

    query.next = getExpressParamValue(req, 'next');
    query.previous = getExpressParamValue(req, 'previous');

    query.sort = getExpressParamValue(req, 'sort');

    return new Query(query);
  }

  public addToQuery(filters: any[] | object, collection: string, type: TQueryQueriesKey = 'api') {
    if (is('array', this.queries[type]?.[collection])) (this.queries[type][collection] as any[]).push(...(filters as any[]));

    if (is('object', this.queries[type]?.[collection])) this.queries[type][collection] = {
      ...this.queries[type][collection],
      ...filters
    };
  }

  public addToAllQueries(filters: any[] | object, type: TQueryQueriesKey = 'api') {
    Object.keys(this.queries[type]).forEach(collection => {
      if (is('array', this.queries[type][collection])) (this.queries[type][collection] as any).push(...(filters as any[]));

      if (is('object', this.queries[type][collection])) this.queries[type][collection] = {
        ...this.queries[type][collection],
        ...filters
      };
    });
  }
}
