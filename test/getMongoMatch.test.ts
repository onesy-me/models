/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { getMongoMatch } from '../src';

group('@onesy/mongo/getMongoMatch', () => {

  to('getMongoMatch', async () => {

    assert([
      getMongoMatch([{ a: 4 }]),
      getMongoMatch([{ a: 4 }], '$or'),
    ]).eql([
      [{ $match: { $and: [{ a: 4 }] } }],
      [{ $match: { $or: [{ a: 4 }] } }],
    ]);

  });

});
