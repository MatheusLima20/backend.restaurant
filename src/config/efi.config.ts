import { logger } from "@shared/logger/logger";

const sandbox: boolean = process.env.SAND_BOX === "TRUE";
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const pathCert = process.env.PATH_CERT;

if (!clientId) {
    logger.error("CLIENT_ID is not defined");
    throw new Error("CLIENT_ID is not defined");
}

if (!clientSecret) {
    logger.error("CLIENT_SECRET is not defined");
    throw new Error("CLIENT_SECRET is not defined");
}

if (!pathCert) {
    logger.error("PATH_CERT is not defined");
    throw new Error("PATH_CERT is not defined");
}

export const efiOptions = {
    sandbox: sandbox,
    client_id: clientId,
    client_secret: clientSecret,
    pathCert: pathCert,
};
