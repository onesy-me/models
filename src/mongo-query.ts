import { Base } from './base';

export interface IMongoQuery {
  response: any[];

  next?: string;
  previous?: string;

  hasNext?: boolean;
  hasPrevious?: boolean;

  amount?: number;
  total?: number;
  skip?: number;
  limit?: number;
}

export class MongoQuery extends Base implements IMongoQuery {

  constructor(
    public response: any[] = [],

    public next?: string,
    public previous?: string,

    public hasPrevious?: boolean,
    public hasNext?: boolean,

    public amount?: number,
    public total?: number,
    public skip?: number,
    public limit?: number,
  ) {
    super();
  }

}
