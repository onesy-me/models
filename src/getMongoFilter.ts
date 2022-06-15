import getMongoOperator from './getMongoOperator';

const getMongoFilter = (field: string, operator: string, value: any): Record<string, any> => {
  switch (operator) {
    case 'equal':
      return { [field]: value };
    case 'not-equal':
      return { [field]: { $ne: value } };

    case 'array-all':
      return Array.isArray(value) && { $and: value.map(v => ({ [field]: v })) };
    case 'array-some':
      return Array.isArray(value) && { $or: value.map(v => ({ [field]: v })) };

    case 'starts-with':
      return { [field]: { $regex: `(?i)^${value}` } };
    case 'contains':
      return { [field]: { $regex: `(?i).*${value}.*` } };

    default:
      return { [field]: { [getMongoOperator(operator)]: value } };
  }
};

export default getMongoFilter;
