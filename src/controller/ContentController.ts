import { NextFunction, Request, Response } from "express";
import { ContentEntity, ContentType } from "../entity/ContentEntity";
import { IsNull, Like, Not } from "typeorm";
import { UploadFile } from "../middlwares/Files/UploadFilesMiddlware";
import { ContentView } from "../views/ContentView";
import { Archive } from "../utils/file/archive";
import { PlatformEntity } from "../entity/PlatformEntity";
import { CompanyEntity } from "../entity/CompanyEntity";
import { dataSource } from "../services/database/database";

export const ContentController = {
    upload: (request: Request, response: Response, next: NextFunction) => {
        try {
            UploadFile.store({
                request: request,
                path: "/images/",
                response: response,
                next: next,
            });
        } catch (error) {
            response.send({ message: error });
        }
    },

    get: async (request: Request, response: Response) => {
        const { date } = request.params;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            const content = await contentRepository.find({
                where: {
                    fkPlatform: platform.id,
                    createdAt: Like(`%${date}%`) as any,
                    fileName: IsNull(),
                },
            });

            const contentView = ContentView.get(content);

            response.send({
                data: contentView,
                message: "Dados encontrados com Sucesso!",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getByTagAndType: async (request: Request, response: Response) => {
        const { tag, companyCPFCNPJ, type } = request.params;

        try {
            const platformRepository = dataSource.getRepository(PlatformEntity);
            const companyRepository = dataSource.getRepository(CompanyEntity);
            const contentRepository = dataSource.getRepository(ContentEntity);

            const company = await companyRepository.findOne({
                where: {
                    cpfcnpj: Number.parseInt(companyCPFCNPJ) as any,
                },
            });

            const platform = await platformRepository.findOne({
                where: {
                    fkCompany: company,
                },
            });

            const content = await contentRepository.find({
                take: 9,
                where: {
                    tag: tag,
                    contentType: type as ContentType,
                    visible: true,
                    fkPlatform: platform.id,
                },
                order: {
                    createdAt: "DESC",
                },
                relations: ["createdBy"],
            });

            const contentView = ContentView.getByTag(content);

            response.send({
                message: "Dados salvos com sucesso!",
                data: contentView,
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getByType: async (request: Request, response: Response) => {
        const { companyCPFCNPJ, type } = request.params;

        try {
            const platformRepository = dataSource.getRepository(PlatformEntity);
            const companyRepository = dataSource.getRepository(CompanyEntity);
            const contentRepository = dataSource.getRepository(ContentEntity);

            const company = await companyRepository.findOne({
                where: {
                    cpfcnpj: Number.parseInt(companyCPFCNPJ) as any,
                },
            });

            const platform = await platformRepository.findOne({
                where: {
                    fkCompany: company,
                },
            });

            const content = await contentRepository.find({
                take: 9,
                where: {
                    visible: true,
                    fkPlatform: platform.id,
                    contentType: type as ContentType,
                },
                order: {
                    createdAt: "DESC",
                },
                relations: ["createdBy"],
            });

            const contentView = ContentView.getByTag(content);

            response.send({
                message: "Dados salvos com sucesso!",
                data: contentView,
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getBySearch: async (request: Request, response: Response) => {
        const { companyCPFCNPJ, search } = request.params;

        try {
            const platformRepository = dataSource.getRepository(PlatformEntity);
            const companyRepository = dataSource.getRepository(CompanyEntity);
            const contentRepository = dataSource.getRepository(ContentEntity);

            const company = await companyRepository.findOne({
                where: {
                    cpfcnpj: Number.parseInt(companyCPFCNPJ) as any,
                },
            });

            const platform = await platformRepository.findOne({
                where: {
                    fkCompany: company,
                },
            });

            const baseWhere = {
                path: IsNull(),
                fileName: IsNull(),
                visible: true,
                fkPlatform: platform.id,
            };

            const searchForTitle = await contentRepository.find({
                where: {
                    ...baseWhere,
                    title: Like(`%${search}%`),
                },
                order: {
                    createdAt: "DESC",
                },
                relations: ["createdBy"],
            });

            let totalContent: ContentEntity[] = [];

            const searchForSubTitle = await contentRepository.find({
                where: {
                    ...baseWhere,
                    subTitle: Like(`%${search}%`),
                },
                order: {
                    createdAt: "DESC",
                },
                relations: ["createdBy"],
            });

            const searchForTag = await contentRepository.find({
                where: {
                    ...baseWhere,
                    tag: Like(`%${search}%`),
                },
                order: {
                    createdAt: "DESC",
                },
                relations: ["createdBy"],
            });

            totalContent = totalContent.concat(searchForTitle);
            totalContent = totalContent.concat(searchForSubTitle);
            totalContent = totalContent.concat(searchForTag);

            const newArray = new Set();

            const wipeArray = totalContent.filter((value) => {
                const duplicatedArray = newArray.has(value.id);
                newArray.add(value.id);
                !duplicatedArray;
            });

            const contentView = ContentView.getByTag(wipeArray);

            response.send({
                message: "Dados encontrados com sucesso!",
                data: contentView,
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getById: async (request: Request, response: Response) => {
        const { id } = request.params;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            const content = await contentRepository.findOne({
                where: {
                    id: Number.parseInt(id),
                },
                relations: ["createdBy"],
            });

            const contentView = ContentView.getById(content);

            response.send({
                message: "Dados salvos com sucesso!",
                data: contentView,
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getGallery: async (request: Request, response: Response) => {
        const user = request.auth.user;
        const platform = user.platform;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            const content = await contentRepository.find({
                where: {
                    fkPlatform: platform.id,
                    fileName: Not(IsNull()),
                },
            });

            const contentView = ContentView.getImages(content);

            response.send({
                message: "Dados salvos com sucesso!",
                result: contentView,
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    store: async (request: Request, response: Response) => {
        const dataBody = request.body;

        const user = request.auth.user;
        const platform = user.platform;

        const file = dataBody.file;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            await contentRepository.save({
                title: dataBody.title,
                subTitle: dataBody.subTitle,
                url: dataBody.url,
                path: file?.path,
                fileName: file?.name,
                text: dataBody.text,
                visible: dataBody?.visible,
                tag: dataBody.tag,
                contentType: dataBody.contentType,
                fkPlatform: platform.id,
                createdBy: user.id as any,
            });

            response.send({
                message: "Dados salvos com sucesso!",
            });
        } catch (error) {
            if (file) {
                Archive.delete(file);
            }

            response.status(404).send({
                message: error,
            });
        }
    },

    patch: async (request: Request, response: Response) => {
        const { id } = request.params;
        const dataBody = request.body;

        const user = request.auth.user;
        const platform = user.platform;

        const file = dataBody.file;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            const contentId = Number.parseInt(id);

            const newContent = {
                title: dataBody.title,
                subTitle: dataBody.subTitle,
                url: dataBody.url,
                path: file?.path,
                fileName: file?.name,
                text: dataBody.text,
                visible: dataBody.visible,
                tag: dataBody.tag,
                contentType: dataBody.contentType,
                fkPlatform: platform.id,
                updatedBy: user.id as any,
            };

            const oldContent = await contentRepository.findOne({
                where: { id: contentId },
            });

            const contentMerge = contentRepository.merge(
                oldContent,
                newContent
            );

            await contentRepository.update(contentId, contentMerge);

            response.send({
                message: "Dados atualizados com sucesso!",
            });
        } catch (error) {
            if (file) {
                Archive.delete(file);
            }

            response.status(404).send({
                message: error,
            });
        }
    },

    patchViewsAmount: async (request: Request, response: Response) => {
        const { id } = request.params;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            const contentId = Number.parseInt(id);

            const oldContent = await contentRepository.findOne({
                where: { id: contentId },
            });

            const newContent = {
                viewsAmount: (oldContent.viewsAmount += 1),
            };

            const contentMerge = contentRepository.merge(
                oldContent,
                newContent
            );

            await contentRepository.update(contentId, contentMerge);

            response.send({
                message: "Dados atualizados com sucesso!",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    deleteArchive: async (request: Request, response: Response) => {
        const { id } = request.params;

        try {
            const contentRepository = dataSource.getRepository(ContentEntity);

            const archive = await contentRepository.findOne({
                where: {
                    id: Number.parseInt(id),
                    fileName: Not(IsNull()),
                },
            });

            if (!archive) {
                response.status(404).send({
                    message: "Arquivo não encontrado!",
                });
                return;
            }

            const archiveName = archive.fileName;

            const content = await contentRepository.findOne({
                where: {
                    url: Like(`%${archiveName}%`),
                },
            });

            if (content) {
                response.status(404).send({
                    message:
                        "Não é possível apagar a imagem, pois ela está sendo utilizada!",
                });
                return;
            }

            await contentRepository.remove(archive);

            const file = {
                path: archive.path,
                name: archive.fileName,
            };

            if (file) {
                Archive.delete(file);
            }

            response.send({
                message: "Dados deletados com sucesso!",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },
};
