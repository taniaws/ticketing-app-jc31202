import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { type } from 'os';

export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const findLocation = await prisma.location.create({
        data: {
          location_name: req.body.location_id,
        },
      });
      const Type = await prisma.type.create({
        data: {
          type_name: req.body.type_id,
        },
      });
      const StatusSchedule = await prisma.status.create({
        data: {
          Statusname: req.body.status_id,
        },
      });
      const categoriEvent = await prisma.categori.create({
        data: {
          categoriname: req.body.categori_id,
        },
      });
      const createEvent = await prisma.event.create({
        data: {
          nama_event: req.body.nama_event,
          tanggal_event: new Date(req.body.tanggal_event).toISOString(),
          location_id: findLocation.id,
          type_id: Type.id,
          deskripsi_event: req.body.deskripsi_event,
          status_id: StatusSchedule.id,
          categori_id: categoriEvent.id,
          feedback: req.body.feedback,
        },
      });
      return res.status(201).send({
        success: true,
        message: 'Your eventcreate is created',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
