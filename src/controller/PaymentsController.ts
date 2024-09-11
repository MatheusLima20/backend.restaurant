import { Request, Response } from "express";
import EfiPay from 'sdk-typescript-apis-efi';
import { efiOptions } from "../credentials";


export const PaymentsController = {

    store: async (resquest: Request, response: Response) => {

        const efipay = new EfiPay({ ...efiOptions, });

        let chargeInput = {
            items: [
                {
                    "name": "Meu Produto",
                    "value": 5990,
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
                    "installments": 1,
                    "payment_token": "47f13d72c883c1547ae4a0df11eb46194f333f85",
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
