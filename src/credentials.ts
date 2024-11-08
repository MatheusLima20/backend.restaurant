import dotenv = require('dotenv');
dotenv.config();

const sandbox: boolean = process.env.SAND_BOX === 'TRUE';
const clienId: string = process.env.CLIENT_ID;
const clientSecret: string = process.env.CLIENT_SECRET;
const pathCert: string = process.env.PATH_CERT;

export const efiOptions = {
    sandbox: sandbox,
    client_id: clienId,
    client_secret: clientSecret,
    pathCert: pathCert,
};