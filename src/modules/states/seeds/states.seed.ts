import { logger } from "@shared/logger/logger";
import { dataSource } from "../../../database/database";
import { StatesEntity } from "../entities/StatesEntity";

export async function statesSeed() {
    try {
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

        logger.info("Estados criados");
    } catch (error) {
        logger.error({
            error,
            module: "seed states",
        });
        throw new Error("Estado não encontrado: " + error);
    }
}
