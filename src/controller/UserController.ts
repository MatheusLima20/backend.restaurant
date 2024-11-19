import { Request, Response } from "express";
import { UserView } from "../views/UserView";
import { AdmLogin } from "../services/security/encripty/AdmLogin";
import { UserEntity } from "../entity/UserEntity";
import { Address, RequestAuth, User } from "../@types/express";
import { AddressEntity } from "../entity/AddressEntity";
import { PlatformEntity } from "../entity/PlatformEntity";
import { UserTypeEntity } from "../entity/UserTypeEntity";
import { StatesEntity } from "../entity/StatesEntity";
import { cpf } from "cpf-cnpj-validator";
import { CompanyEntity } from "../entity/CompanyEntity";
import { getAddressByCEP } from "cep-address-finder";
import { stringFormatter } from "../utils/formatter/string/string.formatter";
import { dataSource } from "../services/database/database";
import { PlanEntity } from "../entity/PlanEntity";
import { dateFormat } from "../utils/date/date";

export const UserController = {
    verifyLogin: async (request: Request, response: Response) => {
        try {
            const name: string = request.auth.user.name;

            response.send({
                data: {
                    name: name,
                },
                message: "Token Valido.",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getUsers: async (request: Request, response: Response) => {
        const { userType } = request.params;

        const auth = request.auth;

        const authUser = auth.user;
        const platform = authUser.platform;

        try {
            const userRepository = dataSource.getRepository(UserEntity);
            const userTypeRepository = dataSource.getRepository(UserTypeEntity);


            const userTypeDataBase = await userTypeRepository.findOne({
                where: { name: userType as any },
            });

            const platformId = platform.id;
            const userTypeId = userTypeDataBase.id;

            const users = await userRepository.find({
                relations: {
                    fkUserType: true
                },
                where: {
                    fkPlatform: {
                        id: platformId
                    },
                    fkUserType: {
                        id: userTypeId
                    },
                },
            });

            const userView = UserView.getUsers(users);
            response.send({
                data: userView,
                message: "Usuários encontrados com sucesso.",
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
            const userRepository = dataSource.getRepository(UserEntity);

            const user = await userRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["UserEntity"],
            });

            if (!user) {
                response.send({ message: "Usuário não encontrado!" });
            }
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    storeCustomer: async (request: Request, response: Response) => {
        const dataUser = request.body;

        const platformCPFCNPJ = dataUser.platformCPFCNPJ;

        const addressBody = dataUser.address;

        try {
            const password = dataUser.password;
            const passwordRepeated = dataUser.passwordRepeated;

            if (password !== passwordRepeated) {
                response.status(404).send({
                    message: "As senhas não conferem.",
                });
                return;
            }

            const userCpf: string = stringFormatter.onlyNumberString(dataUser.cpf);
            const phoneNumber: Number = stringFormatter.onlyNumberInt(
                addressBody.phoneNumber
            );
            const addressCodePostal: Number = stringFormatter.onlyNumberInt(
                addressBody.addressCodePostal
            );

            const isValidCPF = cpf.isValid(userCpf);

            if (!isValidCPF) {
                response.status(404).send({
                    message: "O CPF é invalido.",
                });
                return;
            }

            const getAddressCodePostal = await UserController.getCep(
                addressCodePostal
            );

            if (!getAddressCodePostal) {
                response.status(404).send({
                    message: "Cep não encontrado.",
                });
                return;
            }

            const city = getAddressCodePostal.city;
            const uf = getAddressCodePostal.state;

            await dataSource.transaction(
                async (transactionalEntityManager) => {
                    const platformRepository = dataSource.getRepository(PlatformEntity);
                    const companyRepository =
                        transactionalEntityManager.getRepository(CompanyEntity);
                    const userTypeRepository = dataSource.getRepository(UserTypeEntity);
                    const statesRepository = dataSource.getRepository(StatesEntity);
                    const userRepository =
                        transactionalEntityManager.getRepository(UserEntity);
                    const addressRepository =
                        transactionalEntityManager.getRepository(AddressEntity);

                    const passwordHashed = AdmLogin.hashPassword(password);

                    const companyPlatform = await companyRepository.findOne({
                        where: { cpfcnpj: platformCPFCNPJ },
                    });

                    if (!companyPlatform) {
                        response.status(404).send({
                            message:
                                "Plataforma da empresa não foi encontrada.",
                        });
                        return;
                    }

                    const platformDataBase = await platformRepository.findOne({
                        where: { fkCompany: companyPlatform },
                    });

                    if (!platformDataBase) {
                        response.status(404).send({
                            message: "Plataforma não encontrada.",
                        });
                        return;
                    }

                    const userType = await userTypeRepository.findOne({
                        where: { name: "CUSTOMER" },
                    });

                    if (!userType) {
                        response.status(404).send({
                            message: "Tipo de usuário não encontrado.",
                        });
                        return;
                    }

                    const user = {
                        cpf: userCpf,
                        name: dataUser.userName,
                        email: dataUser.email,
                        password: passwordHashed,
                        userType: userType,
                    };

                    const address = {
                        district: addressBody.district,
                        street: addressBody.street,
                        phoneNumber: phoneNumber,
                        addressNumber: addressBody.addressNumber,
                        addressCodePostal: addressCodePostal,
                    };

                    const emailStored = await userRepository.findOne({
                        where: {
                            email: user.email,
                            fkPlatform: platformDataBase,
                        },
                    });

                    if (emailStored) {
                        response.status(404).send({
                            message: "Email já cadastrado.",
                        });
                        return;
                    }

                    const userDataBase = await userRepository.findOne({
                        where: {
                            cpf: user.cpf,
                            fkPlatform: platformDataBase,
                            fkUserType: userType,
                        },
                    });

                    if (userDataBase) {
                        response.status(404).send({
                            message: "Usuário já cadastrado.",
                        });
                        return;
                    }

                    const userStore = await userRepository.save({
                        cpf: user.cpf,
                        email: user.email,
                        name: user.name,
                        password: passwordHashed,
                        fkPlatform: platformDataBase,
                        fkUserType: userType,
                    } as UserEntity);

                    const stateData = await statesRepository.findOne({
                        where: { uf: uf },
                    });

                    if (!stateData) {
                        response.status(404).send({
                            message: "Estado não encontrado.",
                        });
                        return;
                    }

                    const addressStore = await addressRepository.save({
                        addressCodePostal: address.addressCodePostal,
                        addressNumber: address.addressNumber,
                        district: address.district,
                        fkPlatform: platformDataBase,
                        fkUser: userStore,
                        main: true,
                        phoneNumber: address.phoneNumber,
                        street: address.street,
                        fkState: stateData,
                        city: city,
                    } as AddressEntity);

                    const userView = UserView.store(userStore, addressStore);

                    response.send({
                        data: userView,
                        message: "Dados cadastrados com sucesso!",
                    });
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    storeADM: async (request: Request, response: Response) => {
        const dataUser = request.body;

        const userAuth = request.auth.user;

        const platform = userAuth.platform;

        const userType = userAuth.userType;

        if (userType !== "SUPER") {
            response.status(404).send({
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            const userCPF: string = dataUser.cpf;

            //const isValidCPF = cpf.isValid(userCPF);

            /*if (!isValidCPF) {
                response.status(404).send({
                    message: "O CPF é invalido.",
                });
            }*/

            const address = dataUser.address;

            const addressCodePostal = stringFormatter.onlyNumberInt(
                address.addressCodePostal
            );
            const phoneNumber = stringFormatter.onlyNumberInt(address.phoneNumber);

            const getAddressCodePostal = await UserController.getCep(
                addressCodePostal
            );

            if (!getAddressCodePostal) {
                response.status(404).send({
                    message: "Cep não encontrado.",
                });
                return;
            }

            const city = getAddressCodePostal.city;
            const uf = getAddressCodePostal.state;

            await dataSource.transaction(
                async (transactionalEntityManager) => {
                    const userEntity =
                        transactionalEntityManager.getRepository(UserEntity);
                    const addressEntity =
                        transactionalEntityManager.getRepository(AddressEntity);
                    const userTypeEntity =
                        transactionalEntityManager.getRepository(
                            UserTypeEntity
                        );
                    const statesEntity =
                        transactionalEntityManager.getRepository(StatesEntity);

                    const password = AdmLogin.hashPassword(dataUser.password);

                    const user = {
                        cpf: userCPF,
                        name: dataUser.userName,
                        email: dataUser.email,
                        password: password,
                    };

                    const addressDataBory = {
                        district: address.district,
                        street: address.street,
                        phoneNumber: phoneNumber,
                        addressNumber: address.addressNumber,
                        addressCodePostal: addressCodePostal,
                    };

                    const emailStored = await userEntity.findOne({
                        where: {
                            email: user.email,
                        },
                    });

                    if (emailStored) {
                        response.status(404).send({
                            message: "Email já cadastrado.",
                        });
                        return;
                    }

                    const userType = await userTypeEntity.findOne({
                        where: { name: "ADM" },
                    });

                    if (!userType) {
                        response.status(404).send({
                            message: "Tipo de usuário não encontrado.",
                        });
                        return;
                    }

                    const userStore = await userEntity.save({
                        cpf: user.cpf,
                        email: user.email,
                        name: user.name,
                        password: password,
                        fkPlatform: platform.id as any,
                        fkUserType: userType,
                        createdBy: userAuth.id,
                    } as UserEntity);

                    const stateData = await statesEntity.findOne({
                        where: { uf: uf },
                    });

                    if (!stateData) {
                        response.status(404).send({
                            message: "Estado não encontrado.",
                        });
                        return;
                    }

                    const addressStore = await addressEntity.save({
                        addressCodePostal: addressDataBory.addressCodePostal,
                        addressNumber: addressDataBory.addressNumber,
                        district: addressDataBory.district,
                        fkPlatform: platform.id as any,
                        fkUser: userStore,
                        main: true,
                        phoneNumber: addressDataBory.phoneNumber,
                        street: addressDataBory.street,
                        fkState: stateData,
                        city: city,
                    });

                    const userView = UserView.store(userStore, addressStore);

                    response.send({
                        data: userView,
                        message: "Dados cadastrados com sucesso!",
                    });
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    storeEmployee: async (request: Request, response: Response) => {
        const dataUser = request.body;

        const auth = request.auth;
        const user = auth.user;
        const platform = user.platform;

        const userType = user.userType;

        if (userType !== "SUPER") {
            response.status(404).send({
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            await dataSource.transaction(
                async (transactionalEntityManager) => {
                    const userEntity =
                        transactionalEntityManager.getRepository(UserEntity);
                    const userTypeEntity =
                        transactionalEntityManager.getRepository(
                            UserTypeEntity
                        );
                    const platformRepository = dataSource.getRepository(PlatformEntity);

                    const platformEntity = await platformRepository.findOne({
                        where: {
                            id: platform.id,
                        },
                        relations: {
                            fkPlan: true,
                        }
                    });

                    const totalUsers = await userEntity.find({
                        where: {
                            isActive: true,
                            fkPlatform: {
                                id: platform.id
                            }
                        }
                    });

                    const maxUsersPlan = platformEntity.fkPlan.maxUsers;

                    const moreThanMaxUsersPlan = totalUsers.length > maxUsersPlan;

                    if (moreThanMaxUsersPlan) {
                        response.status(404).send({
                            message: "Limite de usuários cadastrados atingido.",
                        });
                        return;
                    }

                    const password = AdmLogin.hashPassword(dataUser.password);

                    const userBody = {
                        name: dataUser.userName,
                        email: dataUser.email,
                        password: password,
                    };

                    const emailStored = await userEntity.findOne({
                        where: {
                            email: userBody.email,
                        },
                    });

                    if (emailStored) {
                        response.status(404).send({
                            message: "Email já cadastrado.",
                        });
                        return;
                    }

                    const userType = await userTypeEntity.findOne({
                        where: { name: dataUser.userType },
                    });

                    if (!userType) {
                        response.status(404).send({
                            message: "Tipo de usuário não encontrado.",
                        });
                        return;
                    }

                    await userEntity.save({
                        email: userBody.email,
                        name: userBody.name,
                        password: password,
                        fkPlatform: platform.id as any,
                        fkUserType: userType,
                        isActive: dataUser.isActive,
                        createdBy: user.id,
                    } as UserEntity);

                    response.send({
                        message: "Dados cadastrados com sucesso!",
                    });
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    storePlatform: async (request: Request, response: Response) => {
        const dataUser = request.body;

        const plan = dataUser.plan;
        const isMonthPlan = dataUser.isMonthPlan;

        try {
            const userCpfcnpj: string = dataUser.cpfcnpj;

            /*const isValidCNPJ = cnpj.isValid(userCpfcnpj);

            const isValidCPF = cpf.isValid(userCpfcnpj);

            if (!isValidCNPJ && !isValidCPF) {
                response.status(404).send({
                    message: "O CPF/CNPJ é invalido.",
                });
            }*/

            const address = dataUser.address;

            const addressCodePostal = stringFormatter.onlyNumberInt(
                address.addressCodePostal
            );
            const phoneNumber = stringFormatter.onlyNumberInt(address.phoneNumber);

            const getAddressCodePostal = await UserController.getCep(
                addressCodePostal
            );

            if (!getAddressCodePostal) {
                response.status(404).send({
                    message: "Cep não encontrado.",
                });
                return;
            }

            const city = getAddressCodePostal.city;
            const uf = getAddressCodePostal.state;

            await dataSource.transaction(
                async (transactionalEntityManager) => {

                    const planRepository = dataSource.getRepository(PlanEntity);

                    const platformEntity =
                        transactionalEntityManager.getRepository(
                            PlatformEntity
                        );
                    const companyEntity =
                        transactionalEntityManager.getRepository(CompanyEntity);
                    const userEntity =
                        transactionalEntityManager.getRepository(UserEntity);
                    const addressEntity =
                        transactionalEntityManager.getRepository(AddressEntity);
                    const userTypeEntity =
                        transactionalEntityManager.getRepository(
                            UserTypeEntity
                        );
                    const statesEntity =
                        transactionalEntityManager.getRepository(StatesEntity);

                    const planEntity = await planRepository.findOne({
                        where: { name: plan }
                    });

                    const password = AdmLogin.hashPassword(dataUser.password);

                    const companyData = {
                        cpfcnpj: userCpfcnpj,
                        companyName: dataUser.companyName,
                        corporateName: dataUser.corporateName,
                    };

                    const platform = {
                        name: dataUser.platformName,
                        isMonthPlan: isMonthPlan,
                        fkPlan: planEntity,
                    };

                    const user = {
                        name: dataUser.userName,
                        email: dataUser.email,
                        password: password,
                    };

                    const addressDataBory = {
                        district: address.district,
                        street: address.street,
                        phoneNumber: phoneNumber,
                        addressNumber: address.addressNumber,
                        addressCodePostal: addressCodePostal,
                    };

                    const userType = await userTypeEntity.findOne({
                        where: { name: "SUPER" },
                    });

                    if (!userType) {
                        response.status(404).send({
                            message: "Tipo de usuário não encontrado.",
                        });
                        return;
                    }

                    const emailStored = await userEntity.findOne({
                        where: {
                            email: user.email,
                        },
                    });

                    if (emailStored) {
                        response.status(404).send({
                            message: "Email já cadastrado.",
                        });
                        return;
                    }

                    const stateData = await statesEntity.findOne({
                        where: { uf: uf },
                    });

                    if (!stateData) {
                        response.status(404).send({
                            message: "Estado não encontrado.",
                        });
                        return;
                    }

                    const companyDataBase = await companyEntity.findOne({
                        where: { cpfcnpj: companyData.cpfcnpj },
                    });

                    if (companyDataBase) {
                        const platformDataBase = await platformEntity.findOne({
                            where: { fkCompany: companyDataBase },
                        });

                        if (platformDataBase) {
                            response.status(404).send({
                                message: "A plataforma já está cadastrada.",
                            });
                            return;
                        }
                    }

                    const companyStore = await companyEntity.save({
                        cpfcnpj: companyData.cpfcnpj,
                        corporateName: companyData.corporateName,
                        companyName: companyData.companyName,
                    });

                    const platformStore = await platformEntity.save({
                        name: platform.name,
                        fkCompany: companyStore,
                        fkPlan: platform.fkPlan,
                        isMonthPlan: platform.isMonthPlan,
                    } as PlatformEntity);

                    const userStore = await userEntity.save({
                        fkCompany: companyDataBase,
                        email: user.email,
                        name: user.name,
                        password: password,
                        fkPlatform: platformStore,
                        fkUserType: userType,
                    } as UserEntity);

                    const addressStore = await addressEntity.save({
                        addressCodePostal: addressDataBory.addressCodePostal,
                        addressNumber: addressDataBory.addressNumber,
                        district: addressDataBory.district,
                        fkPlatform: platformStore,
                        fkUser: userStore,
                        main: true,
                        phoneNumber: addressDataBory.phoneNumber,
                        street: addressDataBory.street,
                        fkState: stateData,
                        city: city,
                    } as AddressEntity);

                    const userView = UserView.storeCompany(
                        userStore,
                        addressStore
                    );

                    response.send({
                        data: userView,
                        message: "Dados cadastrados com sucesso!",
                    });
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    patchCustomer: async (request: Request, response: Response) => {
        const auth = request.auth;

        const authUser = auth.user;

        const platform = authUser.platform;

        const dataUser = request.body;

        const userType = authUser.userType;

        if (userType !== "SUPER") {
            response.status(404).send({
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            const password = dataUser.password;
            const passwordRepeated = dataUser.passwordRepeated;

            if (password !== passwordRepeated) {
                response.status(404).send({
                    message: "As senhas não conferem.",
                });
                return;
            }

            const address = dataUser.address;

            const userCpf: string = stringFormatter.onlyNumberString(dataUser.cpf);
            const phoneNumber: number = stringFormatter.onlyNumberInt(
                address.phoneNumber
            );
            const addressCodePostal: number = stringFormatter.onlyNumberInt(
                address.addressCodePostal
            );

            /*const isValidCPF = cpf.isValid(userCpf);
      
            if (!isValidCPF) {
              response.status(404).send({
                message: "O CPF é invalido.",
              });
            }*/

            const getAddressCodePostal = await UserController.getCep(
                addressCodePostal
            );

            if (!getAddressCodePostal) {
                response.status(404).send({
                    message: "Cep não encontrado.",
                });
                return;
            }

            const city = getAddressCodePostal.city;
            const uf = getAddressCodePostal.state;

            await dataSource.transaction(
                async (transactionalEntityManager) => {
                    const userTypeEntity = dataSource.getRepository(UserTypeEntity);
                    const statesEntity = dataSource.getRepository(StatesEntity);
                    const userEntity =
                        transactionalEntityManager.getRepository(UserEntity);
                    const addressEntity =
                        transactionalEntityManager.getRepository(AddressEntity);

                    const passwordHashed = AdmLogin.hashPassword(password);

                    const userType = await userTypeEntity.findOne({
                        where: { name: dataUser.userType },
                    });

                    if (!userType) {
                        response.status(404).send({
                            message: "Tipo de usuário não encontrado.",
                        });
                        return;
                    }

                    const user = {
                        id: Number.parseInt(dataUser.id),
                        cpf: userCpf,
                        name: dataUser.userName,
                        email: dataUser.email,
                        password: passwordHashed,
                        fkUserType: userType,
                        updatedAt: dateFormat.now()
                    };

                    const addressStore = {
                        district: address.district,
                        street: address.street,
                        city: city,
                        phoneNumber: phoneNumber,
                        addressNumber: address.addressNumber,
                        addressCodePostal: addressCodePostal,
                        updatedAt: dateFormat.now()
                    };

                    const userDataBase = await userEntity.findOne({
                        where: {
                            id: user.id,
                            fkPlatform: platform.id as any,
                        },
                    });

                    if (!userDataBase) {
                        response.status(404).send({
                            message: "Usuário não cadastrado.",
                        });
                        return;
                    }

                    const userMerge = userEntity.merge(userDataBase, user);

                    await userEntity.update({ id: userDataBase.id }, userMerge);

                    const stateData = await statesEntity.findOne({
                        where: { uf: uf },
                    });

                    if (!stateData) {
                        response.status(404).send({
                            message: "Estado não encontrado.",
                        });
                        return;
                    }

                    const addressDataBase = await addressEntity.findOne({
                        where: { fkUser: userMerge.id as any },
                    });

                    const addressMerge = addressEntity.merge(
                        addressDataBase,
                        addressStore
                    );

                    await addressEntity.update(
                        { id: addressMerge.id },
                        addressMerge
                    );

                    const userView = UserView.patchCollaborator(
                        userMerge,
                        addressMerge
                    );

                    response.send({
                        data: userView,
                        message: "Dados atualizados com sucesso!",
                    });
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    patch: async (request: Request, response: Response) => {

        const { id } = request.params;

        const body = request.body;

        const auth: RequestAuth = request.auth;

        const user: User = auth.user;

        const platform = user.platform;

        const userId = Number.parseInt(id);

        const userType = user.userType;

        const isActive = body.isActive;

        if (userType !== "SUPER") {
            response.status(404).send({
                message: "Usuário sem permissão.",
            });
            return;
        }

        try {
            await dataSource.transaction(
                async (transactionalEntityManager) => {

                    const userEntity = transactionalEntityManager.getRepository(UserEntity);
                    const userTypeEntity = dataSource.getRepository(UserTypeEntity);
                    const platformRepository = dataSource.getRepository(PlatformEntity);

                    if (isActive) {
                        const platformEntity = await platformRepository.findOne({
                            where: {
                                id: platform.id,
                            },
                            relations: {
                                fkPlan: true,
                            }
                        });

                        const totalUsers = await userEntity.find({
                            where: {
                                isActive: true,
                                fkPlatform: {
                                    id: platform.id
                                }
                            }
                        });

                        const maxUsersPlan = platformEntity.fkPlan.maxUsers;

                        const moreThanMaxUsersPlan = totalUsers.length > maxUsersPlan;

                        if (moreThanMaxUsersPlan) {
                            response.status(404).send({
                                message: "Limite de usuários cadastrados atingido.",
                            });
                            return;
                        }
                    }

                    let password = body.password;
                    let passwordRepeated = body.passwordRepeated;

                    if (password) {

                        const isSamePassword = password === passwordRepeated;

                        if (!isSamePassword) {
                            response.send({
                                message: "As senhas não conferem!"
                            });
                        }

                        password = AdmLogin.hashPassword(password);

                    }

                    const userType = await userTypeEntity.findOne({
                        where: { name: body.userType }
                    });

                    if (!userType) {
                        response.status(404).send({
                            message: "Tipo de usuário não encontrado",
                        });
                        return;
                    }

                    const userData = {
                        userName: body.userName,
                        email: body.email,
                        isActive: body.isActive,
                        fkUserType: userType,
                        password: password,
                        updatedBy: user.id,
                    }

                    const oldUser = await userEntity.findOne({
                        where: {
                            id: userId,
                            fkPlatform: {
                                id: platform.id
                            }
                        },
                        relations: { fkUserType: true }
                    });

                    const userMerger = userEntity.merge(oldUser, userData);

                    await userEntity.update({ id: userId }, userMerger);

                    response.send({
                        message: "Usuário atualizado com sucesso!"
                    });
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    delete: async (request: Request, response: Response) => {
        const { id } = request.params;

        try {
            await dataSource.transaction(
                async (transactionalEntityManager) => {
                    const userRepository =
                        transactionalEntityManager.getRepository(UserEntity);

                    const user = await userRepository.findOne({
                        where: { id: Number.parseInt(id) },
                    });

                    if (!user)
                        response.send({
                            message: "Usuário não encontrado!",
                        });

                    await userRepository.delete(id);
                }
            );
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },

    getCep: async (addressCodePostal: string | Number) => {
        try {
            const address = addressCodePostal.toString();
            const cep = await getAddressByCEP(address);

            return cep;
        } catch (error) {
            undefined;
        }
    },

    shearchCep: async (request: Request, response: Response) => {
        const cep: string = request.params.cep;

        try {
            const value: Address = await getAddressByCEP(cep);

            const cepView = UserView.cep(value);

            response.send({
                data: cepView,
                message: "Dados encontrados com sucesso!",
            });
        } catch (error) {
            response.status(404).send({
                message: error,
            });
        }
    },
};

