import { Request, Response } from "express";
import EfiPay from 'sdk-typescript-apis-efi';
import { efiOptions } from "../credentials";


export const PaymentsController = {

    store: async (resquest: Request, response: Response) => {

        const efipay = new EfiPay({ ...efiOptions, });

        let chargeInput = {
            items: [
                {
                    "name": "Plano Iniciante",
                    "value": 59890,
                    "amount": 1
                }
            ],
            payment: {
                "credit_card": {
                    "customer": {
                        "name": "Gorbadoc Oldbuck",
                        "cpf": "94271564656",
                        "email": "email_do_cliente@servidor.com.br",
                        "birth": "1990-08-29",
                        "phone_number": "5144916523"
                    },
                    "installments": 3,
                    "payment_token": "db81217ab9a87e457ff8b5b5e4630516959504ee",
                    "billing_address": {
                        "street": "Avenida Juscelino Kubitschek",
                        "number": "909",
                        "neighborhood": "Bauxita",
                        "zipcode": "35400000",
                        "city": "Ouro Preto",
                        "complement": "",
                        "state": "MG"
                    }
                }
            }
        }

        efipay.createOneStepCharge({}, chargeInput)
            .then((resposta) => {
                console.log(resposta)
            })
            .catch((error) => {
                console.log(error)
            });

        return response.json({ message: "Operação realizada com sucesso!" });

    },

}
