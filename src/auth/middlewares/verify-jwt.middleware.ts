import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export const verifyJWTMiddleware = {

    verifyJWT: async (request: Request, response: Response, next: NextFunction) => {
        const { authorization } = request.headers;

        if (!authorization) {

            response.status(404).send({
                message: "Undefined Token.",
                error: "Undefined Token."
            });
            return;
        }

        const token = authorization.replace('Bearer', '').trim();

        try {

            const data = jwt.verify(token, 'secret') as any;

            const user = data.user;

            request.auth = {
                user: {
                    ...user
                },

            };

            next();

        } catch (error) {

            response.status(404).send({
                message: "Expired Token.",
                error: error
            });
        }

    }

}