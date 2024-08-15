import prisma from "@/prisma";
import { Request, Response } from "express";

export class PromoController{
    async createPromo(req:Request,res:Response){
        try {
           const PromoCreate = await prisma.discount.create({
            data: {
                title:req.body.title,
                referral_code:req.body.referral_code,
                description:req.body.referral_code,
                tanggal:new Date(req.body.tanggal).toISOString(),
                price:req.body.price,
            },
           });
           return res.status(200).send({
            succes:true,
            messsage:"create data succes"
           })
        } catch (error) {
            return res.status(400).send({
                succes:false,
                message:"cant create"
            })
        }
    }
}