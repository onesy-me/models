import { Base } from './base';
import { MongoQuery } from './mongo-query';

export interface IResponsePagination {
  next?: string;
  previous?: string;

  hasNext?: boolean;
  hasPrevious?: boolean;

  amount?: number;
  total?: number;
  skip?: number;
  limit?: number;
}

export class ResponsePagination extends Base implements IResponsePagination {

  constructor(
    public next?: string,
    public previous?: string,

    public hasNext?: boolean,
    public hasPrevious?: boolean,

    public amount?: number,
    public total?: number,
    public skip?: number,
    public limit?: number,
  ) {
    super();
  }

  public static fromMongoQuery(value: MongoQuery): ResponsePagination {
    return new ResponsePagination(
      value.next,
      value.previous,
      value.hasNext,
      value.hasPrevious,
      value.response && value.response.length,
      value.total,
      value.skip,
      value.limit
    );
  }

}
