import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { create } from 'domain';
export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      let findlocation = await prisma.location.findFirst({
        where: {
          locationName: req.body.location,
        },
      });
      if (!findlocation) {
        findlocation = await prisma.location.create({
          data: {
            locationName: req.body.location,
          },
        });
      }

      console.log(findlocation);

      let findcategori = await prisma.categori.findFirst({
        where: {
          categoriName: req.body.categori,
        },
      });
      if (!findcategori) {
        findcategori = await prisma.categori.create({
          data: {
            categoriName: req.body.categori,
          },
        });
      }
      console.log(findcategori);

      console.log('cretea event', req.body);
      const createEvent = await prisma.event.create({
        data: {
          namaEvent: req.body.namaEvent,
          tanggalEvent: new Date(req.body.tanggalEvent).toISOString(),
          locationId: findlocation.id,
          userId: res.locals.decript.id,
          type: req.body.type,
          status: req.body.status,
          deskripsiEvent: req.body.deskripsiEvent,
          categoriId: findcategori.id,
          imgEvent: `/assets/event/${req.file?.filename} `,
          harga: parseInt(req.body.harga),
        },
      });

      return res.status(201).send({
        success: true,
        message: 'Your eventcreate is created',
        result: createEvent,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);
      let findlocation = await prisma.location.findFirst({
        where: {
          locationName: req.body.location,
        },
      });
      if (!findlocation) {
        findlocation = await prisma.location.create({
          data: {
            locationName: req.body.location,
          },
        });
      }
      let findcategori = await prisma.categori.findFirst({
        where: {
          categoriName: req.body.categori,
        },
      });
      if (!findcategori) {
        findcategori = await prisma.categori.create({
          data: {
            categoriName: req.body.categori,
          },
        });
      }
      console.log('cretea event', req.body);
      const updateEvent = await prisma.event.update({
        where: {
          id: Number(id),
        },
        data: {
          namaEvent: req.body.namaEvent,
          tanggalEvent: new Date(req.body.tanggalEvent).toISOString(),
          locationId: findlocation.id,
          userId: res.locals.decript.id,
          type: req.body.type,
          status: req.body.status,
          deskripsiEvent: req.body.deskripsiEvent,
          categoriId: findcategori.id,
          imgEvent: `/assets/event/${req.file?.filename} `,
          harga: parseInt(req.body.harga),
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
  async DeleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteEvent = await prisma.event.delete({
        where: { id: Number(id) },
      });
      console.log(deleteEvent);

      return res.status(200).send({
        succes: true,
        message: 'delete succes',
      });
    } catch (error) {
      console.log(error);
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
          harga: true,
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
          id: true,
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
          imgEvent: true,
          harga: true,
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
  async getDetailEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const GetDetailEvent = await prisma.event.findUnique({
        where: {
          id: Number(req.params.id),
        },
      });
      return res.status(200).send({
        succes: true,
        message: 'this is all data',
        data: GetDetailEvent,
      });
    } catch (error) {}
  }

  //LOCATION
  async getDatalocation(req: Request, res: Response, next: NextFunction) {
    try {
      const getLocation = await prisma.location.findMany({});
      return res.status(200).send({
        succes: true,
        message: 'this is all data',
        data: getLocation,
      });
    } catch (error) {}
  }

  //CATEGORI
  async GetDataCategori(req: Request, res: Response, next: NextFunction) {
    try {
      const getCategori = await prisma.categori.findMany({});
      return res.status(200).send({
        succes: true,
        message: 'this is data',
        data: getCategori,
      });
    } catch (error) {}
  }

  //filter by location
  async filterEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const filterData = await prisma.event.findMany({
        where: {
          location: {
            locationName: req.body.locationName,
          },
        },
      });
      return res.status(200).send({
        succes: true,
        message: 'get data by location succes ',
        data: filterData,
      });
    } catch (error) {}
  }

  async filterCategori(req: Request, res: Response, next: NextFunction) {
    try {
      const filterbyCategori = await prisma.event.findMany({
        where: {
          categori: {
            categoriName: req.body.categoriName,
          },
        },
      });
      return res.status(200).send({
        succes: true,
        message: 'this is all categori',
        data: filterbyCategori,
      });
    } catch (error) {}
  }
  async GetAll(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1; // nomor halaman, default 1
      const limit = parseInt(req.query.limit as string) || 10; // batas item per halaman, default 10
      const skip = (page - 1) * limit; // berapa item yang harus dilewati berdasarkan halaman
      const totalEvents = await prisma.event.count(); // total jumlah event
      const totalPages = Math.ceil(totalEvents / limit); // total halaman yang tersedia
      const getEven = await prisma.event.findMany({
        skip: skip, // melewati beberapa data
        take: limit, // mengambil sejumlah data sesuai limit
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
          imgEvent: true,
          harga: true,
        },
      });

      return res.status(200).send({
        success: true,
        message: 'This is all data',
        data: getEven,
        meta: {
          totalItems: totalEvents,
          totalPages: totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'You did not get all data',
      });
    }
  }
}
