import { CompanyEntity } from "@modules/company/entities/CompanyEntity";
import { dataSource } from "../../../services/database/database";
import { PlanEntity } from "@modules/plan/entities/PlanEntity";
import { UserEntity } from "../entities/UserEntity";
import { AdmLogin } from "../../../services/security/encripty/AdmLogin";
import { PlatformEntity } from "@modules/platform/entities/PlatformEntity";
import {
    UserType,
    UserTypeEntity,
} from "@modules/user.type/entities/UserTypeEntity";
import { logger } from "@shared/logger/logger";

export async function userSeed() {
    try {
        const userRepository = dataSource.getRepository(UserEntity);
        const platformRepository = dataSource.getRepository(PlatformEntity);
        const companyRepository = dataSource.getRepository(CompanyEntity);
        const userTypeRepository = dataSource.getRepository(UserTypeEntity);

        const user = await userRepository.findOne({
            where: {
                email: "matheus2096lima@gmail.com",
            },
        });

        if (!user) {
            const [company] = await companyRepository.find({ take: 1 });

            const [platform] = await platformRepository.find({ take: 1 });

            const userType = await userTypeRepository.findOne({
                where: { name: "SUPER" as UserType },
            });

            if (!userType) {
                throw new Error("Tipo de usuário não encontrado");
            }

            if (!company) {
                throw new Error("Empresa não encontrada");
            }

            if (!platform) {
                throw new Error("Plano não encontrado");
            }

            const newUser: UserEntity = userRepository.create({
                name: "Matheus Santos",
                email: "matheus2096lima@gmail.com",
                password: AdmLogin.hashPassword("12345678"),
                cpf: "593901929491",
                fkPlatform: platform,
                fkCompany: company,
                fkUserType: userType,
            });

            await userRepository.save(newUser);
        }

        logger.info("Usuário criado");
    } catch (error) {
        logger.error({
            error,
            module: "seed user",
        });
        throw new Error("Não foi possível criar o usuário : " + error);
    }
}
