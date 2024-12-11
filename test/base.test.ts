/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { Base } from '../src';

group('@onesy/models/base', () => {

  group('Base', () => {

    to('clean', () => {
      const base = new Base();

      base.a = 4;
      base.ad = undefined;

      assert(Object.keys(base).length).eq(2);

      base.clean();

      assert(Object.keys(base).length).eq(1);
      assert(base.hasOwnProperty('ad')).eq(false);
    });

  });

});
