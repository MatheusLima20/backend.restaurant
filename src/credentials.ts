import dotenv = require('dotenv');
dotenv.config();

const sandbox = process.env.SAND_BOX === 'TRUE';
const clienId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const pathCert = process.env.PATH_CERT;

export const efiOptions = {
    sandbox: sandbox,
    client_id: clienId,
    client_secret: clientSecret,
    pathCert: pathCert,
};