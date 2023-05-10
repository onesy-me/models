/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { ResponsePagination } from '../src';

group('ResponsePagination', () => {

  group('ResponsePagination', () => {

    to('responsePagination', () => {
      const responsePagination = new ResponsePagination(
        'a',
        'b',

        false,
        true,

        4,
        14,
        1,
        4,
      );

      assert(responsePagination.next).eq('a');
      assert(responsePagination.previous).eq('b');

      assert(responsePagination.hasPrevious).eq(true);
      assert(responsePagination.hasNext).eq(false);

      assert(responsePagination.length).eq(4);
      assert(responsePagination.total).eq(14);
      assert(responsePagination.skip).eq(1);
      assert(responsePagination.limit).eq(4);

      assert(responsePagination.clean instanceof Function).eq(true);
    });

    to('fromMongoQuery', () => {
      const responsePagination = ResponsePagination.fromMongoQuery({
        response: [1, 4, 4, 1],

        next: 'a',
        previous: 'b',

        hasPrevious: true,
        hasNext: false,

        total: 14,
        skip: 1,
        limit: 4,
      });

      assert(responsePagination.next).eq('a');
      assert(responsePagination.previous).eq('b');

      assert(responsePagination.hasPrevious).eq(true);
      assert(responsePagination.hasNext).eq(false);

      assert(responsePagination.length).eq(4);
      assert(responsePagination.total).eq(14);
      assert(responsePagination.skip).eq(1);
      assert(responsePagination.limit).eq(4);

      assert(responsePagination.clean instanceof Function).eq(true);
    });

  });

});
