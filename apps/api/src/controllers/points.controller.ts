import { NextFunction, Request, Response } from 'express';
import prisma from '../prisma';

interface IPoints {
  user_id: number;
  amount?: number;
  datecreate: Date;
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

      await prisma.point.create({
        data: {
          user_id: referrer.id,
          amount: 10000,
          datecreate: new Date(),
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
}
