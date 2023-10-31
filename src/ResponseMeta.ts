import { IMongoResponseOptions } from './MongoResponse';
import { Base } from './base';

export interface IResponseMeta {
  status: number;
  message?: string;
  options?: IMongoResponseOptions;
}

export class ResponseMeta extends Base implements IResponseMeta {

  constructor(
    public status: number,
    public message?: string,
    public options?: IMongoResponseOptions
  ) {
    super();
  }

}
