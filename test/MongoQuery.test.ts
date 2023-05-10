/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { MongoQuery } from '../src';

group('MongoQuery', () => {

  to('MongoQuery', () => {
    const mongoQuery = new MongoQuery(
      [1, 4],
      'a',
      'b',

      true,
      false,

      4,
      14,
      1,
      4,
    );

    assert(mongoQuery.response).eql([1, 4]);

    assert(mongoQuery.next).eq('a');
    assert(mongoQuery.previous).eq('b');

    assert(mongoQuery.hasPrevious).eq(true);
    assert(mongoQuery.hasNext).eq(false);

    assert(mongoQuery.length).eq(4);
    assert(mongoQuery.total).eq(14);
    assert(mongoQuery.skip).eq(1);
    assert(mongoQuery.limit).eq(4);

    assert(mongoQuery.clean instanceof Function).eq(true);
  });

});
