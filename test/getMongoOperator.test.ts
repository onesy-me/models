/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { getMongoOperator } from '../src';

group('@onesy/mongo/getMongoFilters', () => {

  to('getMongoFilters', async () => {

    assert([
      getMongoOperator('equal'),
      getMongoOperator('not-equal'),
      getMongoOperator('greater-than'),
      getMongoOperator('greater-than-equal'),
      getMongoOperator('less-than'),
      getMongoOperator('less-than-equal'),
      getMongoOperator('array-all'),
      getMongoOperator('array-some'),
      getMongoOperator('starts-with'),
      getMongoOperator('contains'),
    ]).eql([
      '$eq',
      '$ne',
      '$gt',
      '$gte',
      '$lt',
      '$lte',
      '$eq',
      '$eq',
      '$regex',
      '$regex',
    ]);

  });

});
