import { Base } from './base';

export interface IMongoResponse {
  response: any[];

  next?: string;
  previous?: string;

  hasNext?: boolean;
  hasPrevious?: boolean;

  size?: number;
  total?: number;
  skip?: number;
  limit?: number;
}

export class MongoResponse extends Base implements IMongoResponse {

  constructor(
    public response: any[] = [],

    public next?: string,
    public previous?: string,

    public hasPrevious?: boolean,
    public hasNext?: boolean,

    public size?: number,
    public total?: number,
    public skip?: number,
    public limit?: number,
  ) {
    super();
  }

}
