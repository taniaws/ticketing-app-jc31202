import prisma from '@/prisma';
import { Request, Response } from 'express';

export class PromoController {
  async createPromo(req: Request, res: Response) {
    try {
      const PromoCreate = await prisma.discount.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          tanggal: new Date(req.body.tanggal).toISOString(),
          price: req.body.price,
          detail_transaction: req.body.detail_transaction,
        },
      });
      return res.status(200).send({
        succes: true,
        messsage: 'create data succes',
      });
    } catch (error) {
      return res.status(400).send({
        succes: false,
        message: 'cant create',
      });
    }
  }
}
