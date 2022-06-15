/* tslint:disable: no-shadowed-variable */
import express from 'express';

import { assert, request } from '@amaui/test';

import { Response } from '../src';

group('@amaui/models/response', () => {

  group('Response', () => {

    group('fromObject', () => {

      to('fromObject', () => {
        const response = Response.fromObject({
          _id: '4',
          a: '4',
          meta: undefined,
          data: { a: 4 },
          api_meta: { a: 4 },
        });

        assert(response.response).eql({
          _id: '4',
          data: { a: 4 },
          api_meta: { a: 4 },
        });
        assert(response.meta).eql({ status: 200 });
        assert(Object.keys(response).length).eq(2);
        assert(Object.keys(response.meta).length).eq(1);
      });

      to('original', () => {
        const response = Response.fromObject({
          _id: '4',
          a: '4',
          data: { a: 4 },
          api_meta: { a: 4 },
        }, true);

        assert(response.response).eql({
          _id: '4',
          a: '4',
          data: { a: 4 },
          api_meta: { a: 4 },
        });
        assert(response.meta).eql({ status: 200 });
        assert(Object.keys(response).length).eq(2);
        assert(Object.keys(response.meta).length).eq(1);
      });

    });

    to('fromCreated', () => {
      const response = Response.fromCreated({
        _id: '4',
        data: { a: 4 },
        api_meta: { a: 4 },
      });

      assert(response.response).eql({
        _id: '4',
        api_meta: { a: 4 },
      });
      assert(response.meta).eql({
        message: 'Created',
        status: 201,
      });
      assert(Object.keys(response).length).eq(2);
      assert(Object.keys(response.response).length).eq(2);
      assert(Object.keys(response.meta).length).eq(2);
    });

    to('fromQuery', () => {
      const response = Response.fromQuery({
        response: [1, 4, 1],
        next: 'a',
        previous: 'b',
        hasPrevious: true,
        hasNext: false,
        total: 14,
        skip: 1,
        limit: 4,
      });

      assert(response.response).eql([1, 4, 1]);
      assert(response.meta).eql({
        status: 200,
      });
      assert(response.pagination).eql({
        next: 'a',
        previous: 'b',

        hasNext: false,
        hasPrevious: true,

        amount: 3,
        total: 14,
        skip: 1,
        limit: 4
      });
      assert(Object.keys(response).length).eq(3);
      assert(Object.keys(response.meta).length).eq(1);
      assert(Object.keys(response.pagination).length).eq(8);
    });

    to('fromAny', () => {
      const response = Response.fromAny({ a: '4' });

      assert(response.response).eql({ a: '4' });
      assert(response.meta).eql({ status: 200 });
      assert(Object.keys(response).length).eq(2);
      assert(Object.keys(response.meta).length).eq(1);
    });

    to('fromExpress', async () => {
      const app = express();

      app.get('/', (req, res) => Response.fromExpress(res, { a: '4' }, 201));

      const assertRequest = await request(app);

      const res = await assertRequest.get('/');

      res.response({ a: '4' });
    });

  });

});
