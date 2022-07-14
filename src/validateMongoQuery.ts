import is from '@amaui/utils/is';
import { ValidationError } from '@amaui/errors';

import { IQueryKeys } from './models';
import getMongoOperator from './getMongoOperator';

const validateMongoQuery = (value: object, keys: IQueryKeys = { allowed: [] }): Error | boolean => {
  if (!is('object', value)) throw new ValidationError('Query has to be an object, with collection being properties');

  for (const key of Object.keys(value)) {
    if (keys.allowed.indexOf(key) === -1) throw new ValidationError(`Query property can only be one of the following values: ${keys.allowed.join(', ')}`);

    const collection = value[key];

    if (!is('array', collection)) throw new ValidationError(`${key}'s value has to be an array of filter objects`);

    for (const filter of collection) {
      const { field, operator, value: value_ } = filter;

      if (!is('string', field)) throw new ValidationError(`${key}'s '${field}' field value has to be a string`);

      if (!getMongoOperator(operator)) throw new ValidationError(`${key}'s '${operator}' operator is invalid value`);

      if (
        ['array-some', 'array-all'].indexOf(operator) > -1 &&
        (!is('array', value_) || !value_.length)
      ) throw new ValidationError(`For array-all and array-some operators, value has to be a non-empty array of values`);
    }
  }

  return true;
};

export default validateMongoQuery;
