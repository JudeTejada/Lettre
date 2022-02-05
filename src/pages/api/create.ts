import { db } from '@/utils/primsa';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message, receiver, sender } = req.body;
  try {
    const submission = await db.letter.create({
      data: {
        message,
        receiver,
        sender
      }
    });

    res.status(200).json({ letterId: submission.id });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`
    });
  }
}
