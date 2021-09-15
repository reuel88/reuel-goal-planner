// Next.js API routes support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string
}

const STATUS_CODE = {
  SUCCESS: 200
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(STATUS_CODE.SUCCESS).json({ name: "John Doe" });
}
