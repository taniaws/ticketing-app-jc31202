import prisma from '@/prisma';
import { Request, Response } from 'express';

export class TransaksiController {
  async createTransaksi(req: Request, res: Response) {
    try {
      const TransaksiCreate = await prisma.transaction.create;
    } catch (error) {}
  }
}
