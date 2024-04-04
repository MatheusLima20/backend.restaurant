import { Request, Response } from "express";
import * as nodemailer from "nodemailer";

export const SendMessagesController = {
    email: async (request: Request, response: Response) => {

        try {

            await nodemailer.createTestAccount();

            const transporter = nodemailer.createTransport({
                host: "smtp.kinghost.net",
                port: 587,
                secure: false,
                auth: {
                    user: 'matheus.t.i@paragro.com.br',
                    pass: 'coco@2021',
                },
            });

            const result = await transporter.sendMail({
                from: 'matheus.t.i@paragro.com.br',
                to: "matheus2096lima@gmail.com",
                subject: "Hello ✔",
                text: "I'm was testing this tool",
                html: "<strong>Hello, I think this worked! This I'm sending it's test my " +
                    "function of the web service</strong>",
            });


            return response.json({ data: result });

        } catch (error) {
            return response.status(404).json({ error });
        }

    },

    sms: async (request: Request, response: Response) => {

        try {



        } catch (error) {
            console.log("error");
            return response.status(404).json({ error });
        }

    },
}
