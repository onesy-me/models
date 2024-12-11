/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { getMongoFilter } from '../';

group('@onesy/mongo/getMongoFilter', () => {

  to('getMongoFilter', async () => {

    assert([
      getMongoFilter('a.a', 'equal', 4),
      getMongoFilter('a.a', 'not-equal', 4),
      getMongoFilter('a.a', 'greater-than', 4),
      getMongoFilter('a.a', 'greater-than-equal', 4),
      getMongoFilter('a.a', 'less-than', 4),
      getMongoFilter('a.a', 'less-than-equal', 4),
      getMongoFilter('a.a', 'array-all', [1, 4]),
      getMongoFilter('a.a', 'array-some', [1, 4]),
      getMongoFilter('a.a', 'starts-with', 4),
      getMongoFilter('a.a', 'ends-with', 4),
      getMongoFilter('a.a', 'contains', 4),
    ]).eql([
      { 'a.a': 4 },
      { 'a.a': { $ne: 4 } },
      { 'a.a': { $gt: 4 } },
      { 'a.a': { $gte: 4 } },
      { 'a.a': { $lt: 4 } },
      { 'a.a': { $lte: 4 } },
      { $and: [{ 'a.a': 1 }, { 'a.a': 4 }] },
      { $or: [{ 'a.a': 1 }, { 'a.a': 4 }] },
      { 'a.a': { "$regex": "^4", $options: 'i' } },
      { 'a.a': { "$regex": "4$", $options: 'i' } },
      { 'a.a': { "$regex": ".*4.*", $options: 'i' } },
    ]);

  });

});
