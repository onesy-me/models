/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { validateMongoQuery } from '../src';

group('@amaui/models/validateMongoQuery', () => {

  to('validateMongoQuery', async () => {
    try {
      validateMongoQuery('a' as any, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq('Query has to be an object, with collection being properties');
    }

    try {
      validateMongoQuery({
        a: [],
        aad: [],
      }, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq('Query property can only be one of the following values: a, ad');
    }

    try {
      validateMongoQuery({
        a: ({} as any),
      }, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq(`a's value has to be an array of filter objects`);
    }

    try {
      validateMongoQuery({
        a: [
          { field: true, operator: '', value: 4 },
        ],
      }, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq(`a's 'true' field value has to be a string`);
    }

    try {
      validateMongoQuery({
        a: [
          { field: true, operator: '', value: 4 },
        ],
      }, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq(`a's 'true' field value has to be a string`);
    }

    try {
      validateMongoQuery({
        a: [
          { field: 'a', operator: 'a', value: 4 },
        ],
      }, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq(`a's 'a' operator is invalid value`);
    }

    try {
      validateMongoQuery({
        a: [
          { field: 'a', operator: 'array-all', value: 4 },
        ],
      }, { allowed: ['a', 'ad'] });
    } catch (error) {
      assert(error.message).eq(`For array-all and array-some operators, value has to be a non-empty array of values`);
    }

    assert(validateMongoQuery({
      a: [
        { field: 'a', operator: 'array-all', value: [1, 3, 4] },
      ],
    }, { allowed: ['a', 'ad'] })).eq(true);
  });

});
