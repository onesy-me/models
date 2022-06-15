/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { Query } from '../src';

group('@amaui/models/query', () => {

  pre(() => {
    Query.keys.allowed = ['a', 'ad'];
    Query.collections = ['a', 'ad'];
  });

  group('Query', () => {

    to('query', () => {
      const query = new Query();

      assert(query).eql({
        queries: {
          search: { a: [], ad: [] },
          permissions: { a: [], ad: [] },
          api: { a: [], ad: [] },
          aggregate: { a: [], ad: [] },
          find: { a: {}, ad: {} }
        },
        settings: {
          type: '$and'
        },
        params: {
          path: {},
          query: {}
        },
        limit: 14,
        skip: 0,
        sort: {
          'api_meta.added_at': -1
        },
        next: '',
        previous: '',
        total: false
      });
    });

    group('fromRequest', () => {

      to('fromRequest', () => {
        const query = Query.fromRequest({
          params: { a: '4' },
          query: { ad: 'a' },
          body: {
            query: {
              a: [
                {
                  field: 'meta.created_by',
                  operator: 'equal',
                  value: 'a',
                },
              ],
            },
            next: 'eyJhcGlfbWV0YS5hZGRlZF9hdCI6eyIkZ3QiOjE0NDEyMjc0NDB9fQ==',
            previous: 'eyJhcGlfbWV0YS5hZGRlZF9hdCI6eyIkZ3QiOjE0NDEyMjc0NDB9fQ==',
            limit: 41,
            skip: -1,
            total: true,
            sort: {
              'api_meta.added_at': 1,
            },
            settings: { type: '$or' },
            projection: {
              _id: 1,
              meta: 1,
              data: 1,
            },
          },
        } as any);

        assert(query).eql({
          queries: {
            search: { a: [{ 'meta.created_by': 'a' }], ad: [] },
            permissions: { a: [], ad: [] },
            api: { a: [], ad: [] },
            aggregate: { a: [], ad: [] },
            find: { a: {}, ad: {} }
          },
          settings: { type: '$and' },
          params: { path: {}, query: {} },
          limit: 40,
          skip: 0,
          sort: { 'api_meta.added_at': 1 },
          next: { 'api_meta.added_at': { '$gt': 1441227440 } },
          previous: { 'api_meta.added_at': { '$gt': 1441227440 } },
          total: true
        });
      });

      to('invalid query', () => {
        try {
          Query.fromRequest({
            params: { a: '4' },
            query: { ad: 'a' },
            body: {
              query: {
                a: [],
                ad: [],
              },
            },
          } as any);
        }
        catch (error) {
          assert(error.message).eq(`Query property can only be one of the following values: a, ad`);
        }
      });

    });

  });

});
