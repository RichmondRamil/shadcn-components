// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import ResponseHandler from '../../shared/utils/response';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    ResponseHandler.success(res, { message: 'John Doe' });
  } catch (error: any) {
    ResponseHandler.error(res, { message: error.message });
  }
}
