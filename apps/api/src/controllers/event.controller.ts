import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('cretea event', req.body);
      const createEvent = await prisma.event.create({
        data: {
          namaEvent: req.body.namaEvent,
          tanggalEvent: new Date(req.body.tanggalEvent).toISOString(),
          locationId: parseInt(req.body.locationId),
          userId: res.locals.decript.id,
          type: req.body.type,
          status: req.body.status,
          deskripsiEvent: req.body.deskripsiEvent,
          categoriId: req.body.categoriId,
          imgEvent: `/assets/event/${req.file?.filename} `,
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
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updateEvent = await prisma.event.update({
        where: { id: Number(id) },
        data: {
          namaEvent: req.body.namaEvent,
          tanggalEvent: new Date(req.body.tanggalEvent).toISOString(),
          locationId: parseInt(req.body.locationId),
          userId: res.locals.decript.id,
          type: req.body.type,
          status: req.body.status,
          deskripsiEvent: req.body.deskripsiEvent,
          categoriId: req.body.categoriId,
          imgEvent: `/assets/event/${req.file?.filename}`,
        },
      });
      return res.status(200).send({
        succes: true,
        message: 'update berhasil',
      });
    } catch (error) {
      return res.status(400).send({
        succes: false,
        message: 'error update',
      });
    }
  }
  async DeleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteEvent = await prisma.event.delete({
        where: { id: Number(id) },
      });
      return res.status(200).send({
        succes: true,
        message: 'delete succes',
      });
    } catch (error) {
      return res.status(400).send({
        succes: false,
        message: 'errro delete',
      });
    }
  }
  async GetEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getEven = await prisma.event.findMany({
        where: { id: Number(id) },
        select: {
          namaEvent: true,
          tanggalEvent: true,
          location: {
            select: {
              locationName: true,
            },
          },
          userId: true,
          type: true,
          status: true,
          deskripsiEvent: true,
          categoriId: true,
        },
      });
      return res.status(200).send({
        success: true,
        message: 'this is all data',
        data: getEven,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'you not get all data',
      });
    }
  }
  async GetAllEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const getEven = await prisma.event.findMany({
        select: {
          namaEvent: true,
          tanggalEvent: true,
          location: {
            select: {
              locationName: true,
            },
          },
          userId: true,
          type: true,
          status: true,
          deskripsiEvent: true,
          categoriId: true,
        },
      });
      return res.status(200).send({
        success: true,
        message: 'this is all data',
        data: getEven,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'you not get all data',
      });
    }
  }
}
