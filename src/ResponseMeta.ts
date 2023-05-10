import { Base } from './base';

export interface IResponseMeta {
  status: number;
  message?: string;
}

export class ResponseMeta extends Base implements IResponseMeta {

  constructor(
    public status: number,
    public message?: string
  ) {
    super();
  }

}
