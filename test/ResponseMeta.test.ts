/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { ResponseMeta } from '../src';

group('ResponseMeta', () => {

  to('ResponseMeta', () => {
    const responseMeta = new ResponseMeta(204, 'a');

    assert(responseMeta.status).eq(204);
    assert(responseMeta.message).eq('a');

    assert(responseMeta.clean instanceof Function).eq(true);
  });

});
