import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export const VerifyJWTMiddleware = {

    verifyJWT: async (request: Request, response: Response, next: NextFunction) => {
        const { authorization } = request.headers;

        if (!authorization) {

            return response.status(404).json({
                message: "Token Inexistente.",
                error: "Token Inexistente."
            });
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

            return response.status(404).json({
                message: "Token Expirado.",
                error: error
            });
        }

    }

}