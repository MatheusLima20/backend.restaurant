//#region Imports
import { Router, Request, Response } from "express";
import { readdirSync } from "fs";
import path = require("path");
//#endregion

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
    return response.json({ msg: "Serviço rodando." });
});

//#region Return All Routes

readdirSync(path.join(__dirname, './routes'))
    .forEach(fileName => {
        const fullPath = path.join(__dirname, './routes', fileName);
        const isMap = fileName.includes('.map');
        if (!isMap) {
            const route = require(fullPath);
            routes.use(route);
        }
    });

//#endregion

export default routes;
