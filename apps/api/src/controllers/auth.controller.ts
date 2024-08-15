import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { hashPassword } from "../utils/hash";
import { compareSync } from "bcrypt";
import { createToken } from "../utils/jwt";
import { v4 as uuidv4 } from 'uuid';


interface IUser {
    email: string;
    notelp?: string;
    password: string;
}

export class AuthController {
    //Register
    async regis(req: Request, res: Response, next: NextFunction) {
        try {
          const existingUser = await prisma.user.findUnique({
              where: { email: req.body.email },
          });

          console.log("existing user::", existingUser)

          if (existingUser) {
              return res.status(409).send({
                  success: false,
                  message: "Email is already taken",
              });
          }

          const newReferralCode = uuidv4();

          const user = await prisma.user.create({
              data: {
                  name: req.body.name,
                  email: req.body.email,
                  notelp: req.body.notelp,
                  role: req.body.role,
                  referral_code: newReferralCode,
                  password:  await hashPassword(req.body.password),
              },
          });
          console.log("User Created:", user);

          return res.status(201).send({
              success: true,
              message: "Your account is created",
              referralcode: newReferralCode
          })
        } catch (error) {
            console.log(error);
            next({
                success: false,
                message: "Failed to create account",
                error: error
            })
        }
    }

    //Sign In (Comparing password by bcrypt)
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const findUser = await prisma.user.findUnique({
                where: { email: req.body.email },
            })

            console.log("FIND USER LOGIN:", findUser);
            if (findUser) {
                const comparePass = compareSync(req.body.password, findUser.password);
                if (!comparePass) {
                    if (
                      findUser.limitWrongPassword <
                      Number(process.env.MAX_FORGOT_PASSWORD)
                    ) {
                      let countLimit = findUser.limitWrongPassword + 1;
                      await prisma.user.update({
                        where: { id: findUser?.id },
                        data: {
                          limitWrongPassword: countLimit,
                        },
                      });
                      throw {
                        rc: 400,
                        success: false,
                        message: `Password is wrong. ${countLimit}/${process.env.MAX_FORGOT_PASSWORD}`,
                      };
                    } else {
                      throw {
                        rc: 400,
                        success: false,
                        message: `Your account is Suspended, contact Admin`,
                      };
                    }
                }

                return res.status(200).send({
                    success: true,
                    result: {
                        name: findUser.name,
                        email: findUser.email,
                        password: findUser.password,
                        referral_code: findUser.referral_code,
                        role: findUser.role,
                        notelp: findUser.notelp,
                        token: createToken(
                            { id: findUser.id, email: findUser.email },
                            "24h"
                          ),
                    }
                });
            } else {
                throw {
                    rc: 404,
                    message: "Account doesn't exist",
                }
            }

        } catch (error: any) {
            next(error)
            };
            
    }

    //Keep Login (with token)
    async keepLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const findUser = await prisma.user.findUnique({
                where: {
                    id: res.locals.decript.id,
                },
            });

            if (findUser) {
                return res.status(200).send({
                  success: true,
                  result: {
                    name: findUser?.name,
                    email: findUser?.email,
                    notelp: findUser?.notelp,
                    role: findUser?.role,
                    referral_code: findUser?.referral_code,
                    token: createToken(
                      { id: findUser.id, email: findUser.email },
                      "24h"
                    ),
                  },
                });
              } else {
                throw { rc: 401, message: "Account unauthorized" };
              }
        } catch (error) {
            next(error);
        }
    }
    
};
