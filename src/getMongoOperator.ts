
const getMongoOperator = (operator: string): string | undefined => {
  switch (operator) {
    case 'equal':
      return '$eq';
    case 'not-equal':
      return '$ne';

    case 'greater-than':
      return '$gt';
    case 'greater-than-equal':
      return '$gte';
    case 'less-than':
      return '$lt';
    case 'less-than-equal':
      return '$lte';

    case 'array-some':
      return '$eq';
    case 'array-all':
      return '$eq';

    case 'starts-with':
    case 'contains':
      return '$regex';

    default:
      return;
  }
};

export default getMongoOperator;
