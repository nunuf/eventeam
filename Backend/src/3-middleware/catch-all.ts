import { NextFunction, Request, Response } from 'express';
import logger from '../2-utils/logger';

const catchAll = (err: any, request: Request, response: Response, next: NextFunction) => {

  // Log the error on the console:
  console.log(err);

  // Log the error to an error log file:
  logger('error', '', err);

  // Send back the error to the front:
  response.status(err.status || 500).send(err.message);
};

export default catchAll;
