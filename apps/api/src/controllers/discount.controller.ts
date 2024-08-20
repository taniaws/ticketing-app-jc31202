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
}
