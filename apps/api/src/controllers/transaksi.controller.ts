import prisma from '../prisma';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class TransaksiController {
  async createTransaksi(req: Request, res: Response) {
    try {
      const orderCode = uuidv4().substring(0, 4);
      const TransaksiCreate = await prisma.transaction.create({
        data: {
          amount: req.body.amount,
          eventId: Number(req.body.eventId),
          userId: res.locals.decript.id,
          discountId: req.body.discountId || null,
          price: req.body.price,
          quantity: req.body.quantity,
          transactionCode: orderCode,
          pointsUsed: req.body.pointsUsed || 0,
          createdAt: new Date(),
        },
      });
      const Getcode = await prisma.detailtransaction.create({
        data: {
          ticketcode: orderCode,
          transactionId: TransaksiCreate.id,
        },
      });
      return res.status(200).send({
        succes: true,
        Message: 'Your create succes',
        result: Getcode,
        data: TransaksiCreate,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getDetailTransaksi(req: Request, res: Response, next: NextFunction) {
    try {
      const GetDetail = await prisma.transaction.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).send({
        succes: true,
        message: 'this is all data',
        data: GetDetail,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
