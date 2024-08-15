import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';

export class EventController {
  async createEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const createEvent = await prisma.event.create({
        data: {
          nama_event: req.body.nama_event,
          tanggal_event: new Date(req.body.tanggal_event).toISOString(),
          location_id:req.body.location_id,
          type: req.body.type,
          status:req.body.status,
          deskripsi_event: req.body.deskripsi_event,
          categori_id:req.body.categori_id,
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
  async updateEvent (req:Request,res:Response,next:NextFunction){
    try {
        const {id}=req.params
        const updateEvent = await prisma.event.update({
          where:{id:Number(id)},
          data: {
            nama_event: req.body.nama_event,
            tanggal_event: new Date(req.body.tanggal_event).toISOString(),
            location_id:req.body.location_id,
            type: req.body.type,
            status:req.body.status,
            deskripsi_event: req.body.deskripsi_event,
            categori_id:req.body.categori_id,
            feedback: req.body.feedback,
            point: req.body.point,
          },
        })
        return res.status(200).send({
          succes:true,
          message:"update berhasil",
        })
    } catch (error) {
      return res.status(400).send({
        succes:false,
        message:"error update"
      })
    }
  }
  async DeleteEvent (req:Request,res:Response,next:NextFunction){
    try {
      const{id}=req.params;
      const deleteEvent = await prisma.event.delete({
        where:{id:Number(id)},
      });
      return res.status(200).send({
        succes:true,
        message:"delete succes"
      })
    } catch (error) {
      return res.status(400).send({
        succes:false,
        message:"errro delete",
      })
    }
  }
  async GetEvent(req:Request,res:Response,next:NextFunction){
    try {
      const {id}= req.params
      const getEven = await prisma.event.findMany({
        where:{id:Number(id)},
        select:{
          nama_event: req.body.nama_event,
          tanggal_event:new Date(req.body.tanggal_event).toISOString(),
          type: req.body.type,
          status:req.body.status,
          deskripsi_event: req.body.deskripsi_event,
          feedback: req.body.feedback,
          point: req.body.point,
          location:{
            location_name:true
          },
          categori:{
              categoriname:true
          }
        }
      })
      return res.status(200).send({
        success:true,
        message:"this is all data",
        data:getEven,
      })
    } catch (error) {
      return res.status(400).send({
        succes:false,
        message:"you not get all data"
      })
    }
  }
}


