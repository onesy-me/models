
export interface IClass {
  new(...args: any[]): any;

  [p: string]: any;
}

export type TMethod = (...args: any[]) => any;

export type TObject = Record<string, any>;

export interface IQueryKeys {
  allowed: any[];
}

export interface IMongoSearchManyAdditional {
  pre?: Array<object>;
  prePagination?: Array<object>;
  post?: Array<object>;
}

export interface IMongoSearchOneAdditional {
  pre?: Array<object>;
  post?: Array<object>;
}
