import { StatesEntity } from "@modules/states/entities/StatesEntity";
import { dataSource } from "../../../services/database/database";
import { AddressEntity } from "../entities/AddressEntity";
import { UserEntity } from "@modules/user/entities/UserEntity";
import { CreateAddressDTO } from "../dto/CreatePlanDTO";
import { logger } from "@shared/logger/logger";

export async function addressSeed() {
    try {
        const addressRepository = dataSource.getRepository(AddressEntity);
        const userRepository = dataSource.getRepository(UserEntity);
        const stateRepository = dataSource.getRepository(StatesEntity);

        const addressExists = await addressRepository.findOne({
            where: {
                street: "Rosário",
            },
        });

        const [user] = await userRepository.find({ take: 1 });

        if (!addressExists) {
            const state = await stateRepository.findOne({
                where: {
                    uf: "CE",
                },
            });

            if (!state) {
                throw new Error("Estado não encontrado");
            }

            if (!user) {
                throw new Error("Usuário não encontrado");
            }

            const address: CreateAddressDTO = addressRepository.create({
                city: "Paraipaba",
                district: "Rosário",
                street: "Rosário",
                phoneNumber: 85978541489,
                addressNumber: 25,
                addressCodePostal: 62685000,
                fkUser: user,
                fkState: state,
                fkPlatform: user.fkPlatform,
                main: true,
            });

            await addressRepository.save(address);
        }

        logger.info("Endereço criado");
    } catch (error) {
        logger.error({
            error,
            module: "seed address",
        });
        throw new Error("Não foi possível criar o endereço : " + error);
    }
}
