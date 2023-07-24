import express from 'express';

const getExpressParamValue = (req: express.Request, name: string): any | undefined => {
  const {
    params = {},
    query = {},
    body = {},
  } = req;

  if (body[name] !== undefined) return body[name];

  if (query[name] !== undefined) return query[name];

  if (params[name] !== undefined) return params[name];
};

export default getExpressParamValue;
