import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const regisValidation = [
    body("email").notEmpty().isEmail().withMessage("Email is required"),
    body("password").notEmpty().isStrongPassword({
        minLength: 7,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        minUppercase: 0,
    }).withMessage("Password must be at least 7 characters long and contain at least 1 number and 1 lowercase letter"),
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("notelp")
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone("id-ID").withMessage("Invalid phone number"),
    body("role")
        .notEmpty().withMessage("Role is required"),
    (req: Request, res: Response, next:NextFunction) => {
        const errorValidator = validationResult(req);
        if(!errorValidator.isEmpty()){
            return res.status(400).send({
                success: false,
                error: errorValidator,
            });
        }
        next();
    },
]