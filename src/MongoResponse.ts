import { Base } from './base';

export type TMongoResponseSort = Record<string, 1 | -1 | 'asc' | 'desc' | 'ascending' | 'descending'>;

export interface IMongoResponse<IModel = any> {
  response: IModel[];

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

export class MongoResponse<IModel = any> extends Base implements IMongoResponse<IModel> {

  constructor(
    public response: IModel[] = [],

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
