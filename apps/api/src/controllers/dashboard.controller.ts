import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";

interface IDashboard {
    email: string;
  }
  

export class DashboardController {

    //get event list with user_id
    async getEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const adminEmail = req.params.email;
            const events = await prisma.event.findMany({
                where: {
                    user: {
                        email: adminEmail,
                    }
                },
                include: {
                    location: true,
                    categori: true,
                },
            });

          return res.status(201).send({
              success: true,
              message: "Get event list successful",
              data: events
          })
        } catch (error) {
            console.log(error);
            next({
                success: false,
                message: "Failed to get event list",
                error: error
            })
        }
    };

    //get attendee registration

};