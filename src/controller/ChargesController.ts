import { NextFunction, Request, Response } from "express";
import EfiPay from "sdk-typescript-apis-efi";
import { efiOptions } from "../credentials";
import { dataSource } from "../services/database/database";
import { AddressEntity } from "../entity/AddressEntity";
import { PlatformEntity } from "../entity/PlatformEntity";
import { ChargesEntity } from "../entity/ChargesEntity";
import { dateFormat } from "../utils/date/date";

export const ChargesController = {
    paymentPlatformCreditCard: async (request: Request, response: Response) => {
        const body = request.body;

        const auth = request.auth;

        const user = auth.user;

        const platform = user.platform;

        const efipay = new EfiPay({ ...efiOptions });

        try {
            const platformRepository = dataSource.getRepository(PlatformEntity);
            const addressRepository = dataSource.getRepository(AddressEntity);

            const addressEntity = await addressRepository.findOne({
                where: {
                    fkUser: {
                        id: user.id,
                    },
                    fkPlatform: {
                        id: platform.id,
                    },
                },
                relations: {
                    fkState: true,
                },
            });

            const platformEntity = await platformRepository.findOne({
                where: {
                    id: platform.id,
                },
                relations: {
                    fkPlan: true,
                    fkCompany: true,
                },
            });

            const userName = body.name;

            const planEntity = platformEntity.fkPlan;

            const isMonth = platformEntity.isMonthPlan;

            const planName = planEntity.name;

            const monthValue = planEntity.monthValue;

            const annualValue = planEntity.annualValue;

            const planValue = isMonth ? monthValue : annualValue;

            const dataBody = {
                planName: planName,
                clientInstallments: body.clientInstallments,
                paymentToken: body.paymentToken,
            };

            const value = parseFloat((planValue * 100).toFixed(2));

            let chargeInput = {
                items: [
                    {
                        name: planName,
                        value: value,
                        amount: 1,
                    },
                ],
                payment: {
                    credit_card: {
                        customer: {
                            name: userName,
                            cpf: "94271564656",
                            email: user.email,
                            birth: "1990-08-29",
                            phone_number: addressEntity.phoneNumber.toString(),
                        },
                        installments: dataBody.clientInstallments,
                        payment_token: dataBody.paymentToken,
                        billing_address: {
                            street: addressEntity.street,
                            number: addressEntity.addressNumber.toString(),
                            neighborhood: addressEntity.district,
                            zipcode: addressEntity.addressCodePostal.toString(),
                            city: addressEntity.city,
                            complement: "",
                            state: addressEntity.fkState.uf,
                        },
                    },
                },
            };

            await efipay.createOneStepCharge({}, chargeInput);

            return response.json({
                message: "Pagamento realizado com sucesso!",
            });
        } catch (error) {
            return response
                .status(404)
                .json({ message: "Erro no pagamento." + error });
        }
    },

    generateBilling: async (request: Request, response: Response) => {
        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const dates = dateFormat;

        const payDays = dates.generatePaydays(12, 10);

        try {
            const chargesRepository = dataSource.getRepository(ChargesEntity);
            const platformRepository = dataSource.getRepository(PlatformEntity);

            const hasCharges = await chargesRepository.findOne({
                where: {
                    isPay: false
                }
            });

            if(hasCharges) {
                return response.json({
                    message: "Os pagamentos já foram gerados!",
                });
            }

            const platformEntity = await platformRepository.findOne({
                where: {
                    id: platform.id,
                },
                relations: {
                    fkPlan: true,
                },
            });

            const planEntity = platformEntity.fkPlan;
            const isMonth = platformEntity.isMonthPlan;

            const monthValue = planEntity.monthValue;

            const annualValue = planEntity.annualValue;

            const planValue = isMonth ? monthValue : annualValue;

            for (let index = 0; index < payDays.length; index++) {
                const element = payDays[index];
                await chargesRepository.save({
                    value: planValue,
                    platform: platform.id,
                    payday: element,
                    description: "Mensalidade.",
                });
            }

            return response.json({
                message: "Pagamentos gerados com sucesso!",
            });
        } catch (error) {
            return response
                .status(404)
                .json({ message: "Erro ao gerar pagamentos." + error });
        }
    },
};
