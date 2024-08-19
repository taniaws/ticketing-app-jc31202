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
        where: { referral_code: referralCode },
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
          user_id: referrer.id,
          amount: 10000,
          datecreate: new Date(),
          dateexpire: expirationDate,
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
    const { userId } = req.params; // front end --> hubungkan ke userId

    try {
      const now = new Date();
      const points = await prisma.point.findMany({
        where: {
          user_id: Number(userId),
          dateexpire: {
            //gte --> greater than / equal to >=
            gte: now,
          },
          isdeleted: false,
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
  async markExpiredPointsAsDeleted(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const now = new Date();

    try {
      const result = await prisma.point.updateMany({
        where: {
          dateexpire: {
            lt: now, //lt --> less than <
          },
          isdeleted: false,
        },
        data: {
          isdeleted: true,
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
