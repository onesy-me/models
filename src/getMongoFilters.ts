import is from '@amaui/utils/is';

import getMongoFilter from './getMongoFilter';
import { IFilter, IQueryObject } from './Query';

const getMongoFilters = (
  value_: IQueryObject<IFilter>,
  methodField?: (...args: any[]) => any
): IQueryObject => {
  const result = {};

  if (!is('object', value_)) return result;

  for (const key of Object.keys(value_)) {
    result[key] = [];

    const collection = value_[key];

    if (is('array', collection)) {
      for (const filter of value_[key]) {
        const { value, operator } = filter;

        const field = is('function', methodField) ? methodField(filter.field) : filter.field;

        result[key].push(getMongoFilter(field, operator, value));
      }
    }
  }

  return result;
};

export default getMongoFilters;
