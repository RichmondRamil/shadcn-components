// Create a response handler class
import type { NextApiResponse } from 'next';
export default class ResponseHandler {
  // Success response
  static success(
    res: NextApiResponse,
    data: { message: string },
    statusCode: number = 200
  ) {
    return res.status(statusCode).json(data);
  }

  // Error response
  static error(
    res: NextApiResponse,
    error: { message: string },
    statusCode: number = 500
  ) {
    return res.status(statusCode).json(error);
  }
}
