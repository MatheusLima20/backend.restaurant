import { AddressEntity } from "../../entity/AddressEntity";
import { CompanyEntity } from "../../entity/CompanyEntity";
import { Plan, PlanEntity } from "../../entity/PlanEntity";
import { PlatformEntity } from "../../entity/PlatformEntity";
import { ProductType, ProductTypeEntity } from "../../entity/ProductTypeEntity";
import { StatesEntity } from "../../entity/StatesEntity";
import {
    Unit,
    UnitMeasurementEntity,
} from "../../entity/UnitMeasurementEntity";
import { UserEntity } from "../../entity/UserEntity";
import { UserTypeEntity } from "../../entity/UserTypeEntity";
import { AdmLogin } from "../security/encripty/AdmLogin";
import { dataSource } from "./database";


export async function seed() {
    /*
  =========================================
  STATES
  =========================================
  */

    const stateRepository = dataSource.getRepository(StatesEntity);

    const states = [
        { uf: "AC", name: "Acre" },
        { uf: "AL", name: "Alagoas" },
        { uf: "AM", name: "Amazonas" },
        { uf: "AP", name: "Amapá" },
        { uf: "BA", name: "Bahia" },
        { uf: "CE", name: "Ceará" },
        { uf: "DF", name: "Distrito Federal" },
        { uf: "ES", name: "Espírito Santo" },
        { uf: "GO", name: "Goiás" },
        { uf: "MA", name: "Maranhão" },
        { uf: "MG", name: "Minas Gerais" },
        { uf: "MS", name: "Mato Grosso do Sul" },
        { uf: "MT", name: "Mato Grosso" },
        { uf: "PA", name: "Pará" },
        { uf: "PB", name: "Paraíba" },
        { uf: "PE", name: "Pernambuco" },
        { uf: "PI", name: "Piauí" },
        { uf: "PR", name: "Paraná" },
        { uf: "RJ", name: "Rio de Janeiro" },
        { uf: "RN", name: "Rio Grande do Norte" },
        { uf: "RO", name: "Rondônia" },
        { uf: "RR", name: "Roraima" },
        { uf: "RS", name: "Rio Grande do Sul" },
        { uf: "SC", name: "Santa Catarina" },
        { uf: "SE", name: "Sergipe" },
        { uf: "SP", name: "São Paulo" },
        { uf: "TO", name: "Tocantins" },
    ];

    for (const item of states) {
        const exists = await stateRepository.findOne({
            where: {
                uf: item.uf,
                name: item.name,
            },
        });

        if (!exists) {
            const state = stateRepository.create(item);

            await stateRepository.save(state);
        }
    }

    console.log("States criados");

    /*
  =========================================
  PLANS
  =========================================
  */

    const planRepository = dataSource.getRepository(PlanEntity);

    const plans = [
        {
            name: "Iniciante" as Plan,
            month_value: 99.9,
            annual_value: 79.9,
            max_tables: 8,
            max_users: 4,
            tax_delivery: 0.04,
            max_boxday: 1,
        },
        {
            name: "Profissional" as Plan,
            month_value: 149.9,
            annual_value: 129.9,
            max_tables: 20,
            max_users: 8,
            tax_delivery: 0.04,
            max_boxday: 2,
        },
    ];

    for (const item of plans) {
        const exists = await planRepository.findOne({
            where: {
                name: item.name,
                annualValue: item.annual_value,
                monthValue: item.month_value,
                maxTables: item.max_tables,
                maxBoxDay: item.max_boxday,
                taxDelivery: item.tax_delivery,
            },
        });

        if (!exists) {
            const plan = planRepository.create(item);

            await planRepository.save(plan);
        }
    }

    console.log("Plans criados");

    /*
  =========================================
  PRODUCT TYPES
  =========================================
  */

    const productTypeRepository = dataSource.getRepository(ProductTypeEntity);

    const productTypes: ProductType[] = [
        "PRATO",
        "GUARNIÇÃO",
        "BEBIDA",
        "SOBREMESA",
        "PETISCO",
        "ALMOÇO",
        "PF",
    ];

    for (const name of productTypes) {
        const exists = await productTypeRepository.findOne({
            where: { name },
        });

        if (!exists) {
            const type = productTypeRepository.create({
                name,
            });

            await productTypeRepository.save(type);
        }
    }

    console.log("Tipos de produto criados");

  /*
  =========================================
  User Type
  =========================================
  */

    const userTypeRepository =
  dataSource.getRepository(UserTypeEntity);

    const userTypes = [
    "SUPER",
    "ADM",
    "CUSTOMER",
    "WAITER",
    "DELIVERYMAN",
    "COOK"
    ];

for (const name of userTypes) {

  const exists =
    await userTypeRepository.findOne({
      where: {
        name
      }
    });

  if (!exists) {

    const userType =
      userTypeRepository.create({
        name
      });

    await userTypeRepository.save(
      userType
    );
  }
}

console.log("Tipos de usuário criados");

    /*
  =========================================
  UNIT MEASUREMENT
  =========================================
  */

    const measurementRepository = dataSource.getRepository(
        UnitMeasurementEntity,
    );

    const measurements = [
        {
            name: "KG" as Unit,
            description: "Quilo",
        },
        {
            name: "g" as Unit,
            description: "Gramas",
        },
        {
            name: "L" as Unit,
            description: "Litro",
        },
        {
            name: "UN" as Unit,
            description: "Unidade",
        },
    ];

    for (const item of measurements) {
        const exists = await measurementRepository.findOne({
            where: {
                name: item.name as Unit,
                description: item.description,
            },
        });

        if (!exists) {
            const measurement = measurementRepository.create(item);

            await measurementRepository.save(measurement);
        }
    }

    console.log("Unidades criadas");

    /*
  =========================================
  COMPANY
  =========================================
  */

    const companyRepository = dataSource.getRepository(CompanyEntity);

    const company = await companyRepository.find();

    const newCompany = companyRepository.create({
        cpfcnpj: "64897849889789",
        companyName: "Restaurante Beira Mar",
        corporateName: "Matheus Lima Dos Santos",
    });

    if (!company) {
        await companyRepository.save(newCompany);
    }

    console.log("Empresa criada");

    /*
  =========================================
  PLATFORM
  =========================================
  */

    const platformRepository = dataSource.getRepository(PlatformEntity);

    const platform = await platformRepository.find();

     const pŕimaryCompany = await companyRepository.findOne({
            where: {
                id: newCompany.id,
            },
        });

        const planEntity = dataSource.getRepository(PlanEntity);

        const plan = await planEntity.findOne({
            where: {
                name: "Profissional",
            },
        });

        if (!pŕimaryCompany) {
            throw new Error("Empresa não encontrada");
        }

        if (!plan) {
            throw new Error("Plano não encontrado");
        }

    const objectPlatform = {
            name: "Matheus Restaurante",
            fkPlan: plan,
            fkCompany: pŕimaryCompany,
        }

    if (platform.length == 0) {

        const newPlatform: PlatformEntity = platformRepository.create(objectPlatform);

        await platformRepository.save(newPlatform);
    }

    console.log("Platform criada");

    /*
  =========================================
  USER
  =========================================
  */

    const userRepository = dataSource.getRepository(UserEntity);

    const user = await userRepository.findOne({
        where: {
            email: "matheus2096lima@gmail.com",
        },
    });

    if (!user) {

        const company = await companyRepository.findOne({
            where: {
                companyName: newCompany.companyName,
            },
        });

        const platform = await platformRepository.findOne({
            where: {
                name: objectPlatform.name,
            },
        });

        const userType = await userTypeRepository.findOne({
            where: {name: "SUPER"}
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
            name: "Matheus Lima",
            email: "matheus2096lima@gmail.com",
            password: AdmLogin.hashPassword("12345678"),
            cpf: "593901929491",
            fkPlatform: platform,
            fkCompany: company,
            fkUserType: userType,
        });

        await userRepository.save(newUser);
    }

    console.log("Usuário criado");

    /*
  =========================================
  ADDRESS
  =========================================
  */

    const addressRepository = dataSource.getRepository(AddressEntity);

    const addressExists = await addressRepository.findOne({
        where: {
            street: "Rosário",
        },
    });

    if (!addressExists) {
        const ceara = await stateRepository.findOne({
            where: {
                uf: "CE",
            },
        });

        const address = addressRepository.create({
            main: true,
            city: "Paraipaba",
            district: "Rosário",
            street: "Rosário",
            phone_number: 85978541489,
            address_number: 25,
            address_code_postal: 62685000,

            user,
            platform,
            state: ceara,
        } as unknown as AddressEntity);

        await addressRepository.save(address);
    }

    console.log("Endereço criado");

    console.log("Seed finalizado");
}
