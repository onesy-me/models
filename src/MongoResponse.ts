import { Base } from './base';

export type TMongoResponseSort = Record<string, 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending'>;

export interface IMongoResponse {
  response: any[];

  next?: string;
  previous?: string;

  hasNext?: boolean;
  hasPrevious?: boolean;

  sort?: TMongoResponseSort;
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

    public sort?: TMongoResponseSort,
    public size?: number,
    public total?: number,
    public skip?: number,
    public limit?: number,
  ) {
    super();
  }

}
