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
      return { [field]: { $regex: `^${value}`, $options: 'i' } };
    case 'ends-with':
      return { [field]: { $regex: `${value}$`, $options: 'i' } };
    case 'contains':
      return { [field]: { $regex: `.*${value}.*`, $options: 'i' } };

    default:
      return { [field]: { [getMongoOperator(operator)]: value } };
  }
};

export default getMongoFilter;
