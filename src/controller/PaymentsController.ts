import { Request, Response } from "express";
import EfiPay from 'sdk-typescript-apis-efi';
import { efiOptions } from "../credentials";
import { dataSource } from "../data.source";
import { AddressEntity } from "../entity/AddressEntity";
import { PlatformEntity } from "../entity/PlatformEntity";
import { Int32, IntegerType } from "typeorm";


export const PaymentsController = {

    paymentPlatformCreditCard: async (request: Request, response: Response) => {

        const body = request.body;

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        const efipay = new EfiPay({ ...efiOptions, });

        try {

            const platformRepository = dataSource.getRepository(PlatformEntity);
            const addressRepository = dataSource.getRepository(AddressEntity);

            const addressEntity = await addressRepository.findOne({
                where: {
                    fkUser: {
                        id: user.id,
                    },
                    fkPlatform: {
                        id: platform.id
                    },
                },
                relations: {
                    fkState: true,
                }
            });

            const platformEntity = await platformRepository.findOne({
                where: {
                    id: platform.id,
                },
                relations: {
                    fkPlan: true,
                    fkCompany: true,
                }
            });


            const planEntity = platformEntity.fkPlan;

            const isMonth = platformEntity.isMonthPlan;

            const planName = planEntity.name;

            const monthValue = planEntity.monthValue;

            const annualValue = planEntity.annualValue;

            const planValue = isMonth ? monthValue : annualValue * 12;

            const dataBody = {
                planName: planName,
                clientInstallments: body.clientInstallments,
                paymentToken: body.paymentToken,
            }

            const cpfcnpj = platformEntity.fkCompany.cpfcnpj;

            let cpfOrCnpj: any = { "cpf": cpfcnpj };

            if (Number.parseInt(cpfcnpj) > 11) {
                cpfOrCnpj = { "cnpj": cpfcnpj };
            }
            
            let chargeInput = {
                items: [
                    {
                        "name": planName,
                        "value": new Int32(planValue),
                        "amount": 1
                    }
                ],
                payment: {
                    "credit_card": {
                        "customer": {
                            "name": user.name,
                            ...cpfOrCnpj,
                            "email": user.email,
                            "birth": "1990-08-29",
                            "phone_number": addressEntity.phoneNumber.toString(),
                        },
                        "installments": dataBody.clientInstallments,
                        "payment_token": dataBody.paymentToken,
                        "billing_address": {
                            "street": addressEntity.street,
                            "number": addressEntity.addressNumber.toString(),
                            "neighborhood": addressEntity.district,
                            "zipcode": addressEntity.addressCodePostal.toString(),
                            "city": addressEntity.city,
                            "complement": "",
                            "state": addressEntity.fkState.name
                        }
                    }
                }
            }

            await efipay.createOneStepCharge({}, chargeInput);

            return response.json({ message: "Operação realizada com sucesso!" });

        } catch (error) {
            return response.status(404).json({ message: "Erro no pagamento." });
        }

    },

}
