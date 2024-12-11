/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { getMongoFilters } from '../src';

group('@onesy/mongo/getMongoFilters', () => {

  to('getMongoFilters', async () => {

    assert(getMongoFilters({
      a: [
        { operator: 'equal', field: 'a.a', value: 4 },
        { operator: 'not-equal', field: 'a.a', value: 4 },
        { operator: 'greater-than', field: 'a.a', value: 4 },
        { operator: 'greater-than-equal', field: 'a.a', value: 4 },
        { operator: 'less-than', field: 'a.a', value: 4 },
        { operator: 'less-than-equal', field: 'a.a', value: 4 },
        { operator: 'array-all', field: 'a.a', value: [1, 4] },
        { operator: 'array-some', field: 'a.a', value: [1, 4] },
        { operator: 'starts-with', field: 'a.a', value: 4 },
        { operator: 'ends-with', field: 'a.a', value: 4 },
        { operator: 'contains', field: 'a.a', value: 4 },
      ]
    })).eql({
      a: [
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
      ],
    });

  });

});
