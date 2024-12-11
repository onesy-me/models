/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { getExpressParamValue } from '../src';

group('@onesy/models/getExpressParamValue', () => {

  to('getExpressParamValue', async () => {
    const values_ = [
      { query: { a: 'a' } },
      { params: { a: 'a' } },
      { body: { a: 'a' } },
      {},
    ];

    const valueNode = values_.map(value => getExpressParamValue(value as any, 'a'));
    const values = [valueNode];

    values.forEach(value => assert(value).eql([
      'a',
      'a',
      'a',
      undefined,
    ]));
  });
});
