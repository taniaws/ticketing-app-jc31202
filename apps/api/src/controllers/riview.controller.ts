import prisma from '../prisma';
import { NextFunction, Request, Response } from 'express';


export class feedbackController {
  async feedbackCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const event = await prisma.event.findUnique({
        where: { id: req.body.event_id },
      });

      const user = await prisma.user.findUnique({
        where: { id: req.body.user_id },
      });

      if (!event) {
        return res.status(404).send("Event tidak ditemukan");
      }
      if (!user) {
        return res.status(404).send("User tidak ditemukan");
      }
      const feedback = await prisma.feedback.create({
        data: {
          feedback: req.body.feedback,
          event_id: req.body.event_id,
          user_id: req.body.user_id,
        },
      });
      res.status(201).send("berhasil memberikan feedback");
    } catch (error) {
      res.status(500).send("gagal memberikan feedback");
    }
  }
}
