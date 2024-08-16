import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

interface IDiscount {
    id: number;
    title: string;
    description: string;
    datecreate: Date;
    dateexpire: Date;
    isdeleted?: boolean;
    percent: number;
    code: string;
    user_id: number;
  }
  

export class DiscountController {

    async createDiscount(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, percent, code, user_id } = req.body;

            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 3)

            const discount = await prisma.discount.create({
            data: {
                title,
                description,
                datecreate: new Date(),
                dateexpire: expirationDate,
                isdeleted: false,
                percent,
                code,
                user_id,
            },
            });

          return res.status(201).send({
              success: true,
              message: "Discount code created successfully",
              discount: discount
          })
        } catch (error) {
            console.log(error);
            next({
                success: false,
                message: "Failed to create discount code",
                error: error
            })
        }
    };

    // Get Valid Discount for a User
    async getValidDiscount(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.params; // front end --> hubungkan ke userId

        try {
            const now = new Date();
            const points = await prisma.discount.findMany({
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
                message: "Failed to get discounts",
                error: error
            });
        }
    }

    // Soft Delete expired discount
    async markExpiredDiscountAsDeleted(req: Request, res: Response, next: NextFunction) {
        const now = new Date();
    
        try {
            const result = await prisma.discount.updateMany({
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
                data_deleted: result.count
            });
        } catch (error) {
            console.log("Failed to mark expired discounts as deleted:", error);
        }
    }

};