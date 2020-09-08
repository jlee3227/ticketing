import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@ej-tickets/common';

const router = express.Router();

router.get(
    '/api/orders',
    requireAuth,
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('ticketId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        res.send({});
    }
);

export { router as indexOrderRouter };
