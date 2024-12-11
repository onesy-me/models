/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { MongoResponse } from '../src';

group('MongoResponse', () => {

  to('MongoResponse', () => {
    const mongoResponse = new MongoResponse(
      [1, 4],
      'a',
      'b',

      true,
      false,

      { added_at: -1 },
      4,
      14,
      1,
      4,
    );

    assert(mongoResponse.response).eql([1, 4]);

    assert(mongoResponse.next).eq('a');
    assert(mongoResponse.previous).eq('b');

    assert(mongoResponse.hasPrevious).eq(true);
    assert(mongoResponse.hasNext).eq(false);

    assert(mongoResponse.sort).eql({ added_at: -1 });
    assert(mongoResponse.size).eq(4);
    assert(mongoResponse.skip).eq(1);
    assert(mongoResponse.limit).eq(4);
    assert(mongoResponse.total).eq(14);

    assert(mongoResponse.clean instanceof Function).eq(true);
  });

});
