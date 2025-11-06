import { db } from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { withValidation } from 'next-validations';

const schema = z.object({
  sender: z.string({
    required_error: 'sender is requried',
    invalid_type_error: 'sender should be a string'
  }),
  receiver: z.string({
    required_error: 'receiver is requried',
    invalid_type_error: 'receiver should be a string'
  }),
  message: z.string({
    required_error: 'message is requried',
    invalid_type_error: 'message should be a string'
  }),
  title: z.string({
    required_error: 'title is requried',
    invalid_type_error: 'title should be a string'
  })
});

const validate = withValidation({
  schema,
  type: 'Zod',
  mode: 'body'
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, receiver, sender, title } = req.body;

  try {
    const submission = await db.letter.create({
      data: {
        message,
        receiver,
        sender,
        title
      }
    });

    res.status(200).json({ letterId: submission.id, success: true });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
      success: false
    });
  }
};

export default validate(handler);
