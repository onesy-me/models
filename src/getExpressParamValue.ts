import express from 'express';

const getExpressParamValue = (req: express.Request, name: string): any | undefined => {
  const {
    params = {},
    query = {},
    body = {},
  } = req;

  if (params[name] !== undefined) return params[name];

  if (query[name] !== undefined) return query[name];

  if (body[name] !== undefined) return body[name];
};

export default getExpressParamValue;
