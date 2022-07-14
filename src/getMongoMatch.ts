import is from '@amaui/utils/is';

import { TMatch, TMatchOperator } from './query';

const getMongoMatch = (query: Array<object>, type: TMatchOperator = '$and'): Array<TMatch> => {
  const pipeline = [];

  if (is('array', query) && !!query.length) {
    pipeline.push({
      $match: {
        [type]: query,
      },
    });
  }

  return pipeline;
};

export default getMongoMatch;
