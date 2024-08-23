import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

interface IDiscount {
  id: number;
  title: string;
  description: string;
  dateCreate: Date;
  dateExpire: Date;
  isDeleted?: boolean;
  percent: number;
  code: string;
  userId: number;
}

export class DiscountController {
  async createDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, percent, code, user_id } = req.body;

      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 3);

      const discount = await prisma.discount.create({
        data: {
          title,
          description,
          dateCreate: new Date(),
          dateExpire: expirationDate,
          isDeleted: false,
          percent,
          code,
          userId: user_id,
        },
      });

      return res.status(201).send({
        success: true,
        message: 'Discount code created successfully',
        discount: discount,
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Failed to create discount code',
        error: error,
      });
    }
  }

  // Get Valid Discount for a User
  async getValidDiscount(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params; // front end --> hubungkan ke email

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }
    
    try {
      const now = new Date();

      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      
      const discounts = await prisma.discount.findMany({
        where: {
          userId: user?.id,
          dateExpire: {
            //gte --> greater than / equal to >=
            gte: now,
          },
          isDeleted: false,
        },
      });

      return res.status(200).json({
        success: true,
        discounts,
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Failed to get discounts',
        error: error,
      });
    }
  }

  // Soft Delete expired discount
  async markExpiredDiscountAsDeleted(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const now = new Date();

    try {
      const result = await prisma.discount.updateMany({
        where: {
          dateExpire: {
            lt: now, //lt --> less than <
          },
          isDeleted: false,
        },
        data: {
          isDeleted: true,
        },
      });

      return res.status(200).json({
        success: true,
        data_deleted: result.count,
      });
    } catch (error) {
      console.log('Failed to mark expired discounts as deleted:', error);
    }
  }

  //Redeem discount
  async redeemDiscount(req: Request, res: Response, next: NextFunction) {
    const { userId, discountCode, eventId, quantity } = req.body;

    if (!userId || !discountCode || !eventId || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'User ID, discount code, event ID, and quantity are required',
      });
    }

    try {
      const discount = await prisma.discount.findUnique({
        where: { code: discountCode },
      });

      if (!discount) {
        return res.status(404).json({
          success: false,
          message: 'Discount code not found',
        });
      }

      if (discount.isDeleted) {
        return res.status(400).json({
          success: false,
          message: 'Discount code is invalid or expired',
        });
      }

      const existingUse = await prisma.transaction.findFirst({
        where: {
          userId,
          discountId: discount.id,
          eventId,
        },
      });
  

      if (existingUse) {
        return res.status(400).json({
          success: false,
          message: 'Discount code already used by user',
        });
      }

      const event = await prisma.event.findUnique({
        where: { id: eventId },
      });
  
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found',
        });
      }

      const price = event.harga;
      const discountAmount = (price * discount.percent) / 100;
      const totalPrice = (price - discountAmount) * quantity;

      const transaction = await prisma.transaction.create({
        data: {
          userId,
          amount: totalPrice,
          createdAt: new Date(),
          eventId,
          discountId: discount.id,
          transactionCode: `TRANS_${new Date().getTime()}`,
          quantity,
          price,
        },
      });

      await prisma.detailtransaction.create({
        data: {
          transactionId: transaction.id,
          isAttendance: false,
          ticketcode: `TICKET_${new Date().getTime()}`,
        },
      });

      await prisma.discount.update({
        where: { id: discount.id },
        data: { isDeleted: true },
      });

      return res.status(200).json({
        success: true,
        message: 'Discount redeemed successfully',
      });
    } catch (error) {
      console.error(error);
      next({
        success: false,
        message: 'Failed to redeem discount',
        error: error,
      });
    }
  }
}
