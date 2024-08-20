import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

interface IPoints {
  user_id: number;
  amount?: number;
  datecreate: Date;
  dateexpire: Date;
}

export class PointsController {
  //Redeem Referral Code for Points
  async redeemReferralCode(req: Request, res: Response, next: NextFunction) {
    // front end --> masukkin referralCode
    const { referralCode } = req.body;

    try {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referralCode },
      });

      if (!referrer) {
        return res.status(404).send({
          success: false,
          message: 'Invalid referral code',
        });
      }

      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 3);
      await prisma.point.create({
        data: {
          userId: referrer.id,
          amount: 10000,
          dateCreate: new Date(),
          dateExpire: expirationDate,
        },
      });

      return res.status(201).send({
        success: true,
        message: 'Referral code redeemed successfully',
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Failed to redeem referral code',
        error: error,
      });
    }
  }
  // Get Valid Points for a User
  async getValidPoints(req: Request, res: Response, next: NextFunction) {
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
      
      const points = await prisma.point.findMany({
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
        points,
      });
    } catch (error) {
      console.log(error);
      next({
        success: false,
        message: 'Failed to get points',
        error: error,
      });
    }
  }

  // Soft Delete expired points
  async markExpiredPointsAsDeleted(req: Request, res: Response, next: NextFunction) {
    const now = new Date();
    try {
      const result = await prisma.point.updateMany({
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
      console.log('Failed to mark expired points as deleted:', error);
    }
  }
}
