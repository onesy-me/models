import is from '@onesy/utils/is';

import { TMatch, TMatchOperator } from './Query';

const getMongoMatch = (query: Array<object>, operator: TMatchOperator = '$and'): Array<TMatch> => {
  const pipeline = [];

  if (is('array', query) && !!query.length) {
    pipeline.push({
      $match: {
        [operator]: query,
      },
    });
  }

  return pipeline;
};

export default getMongoMatch;
