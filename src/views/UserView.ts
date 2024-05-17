import { AddressEntity } from "../entity/AddressEntity";
import { UserEntity } from "../entity/UserEntity";
import { Address } from "../types/express";


export const UserView = {

    getPhysicalPerson: (users: Array<UserEntity>, address: Array<AddressEntity>) => {

        return users.map((user: UserEntity, index: number) => {

            return {
                id: user.id,
                userName: user.name,
                cpf: user.cpf,
                email: user.email,
                address: {
                    city: address[index].city,
                    state: address[index].fkState.name,
                    street: address[index].street,
                    district: address[index].district,
                    phoneNumber: address[index].phoneNumber,
                    addressNumber: address[index].addressNumber,
                    addressCodePostal: address[index].addressCodePostal.toString(),
                }
            }
        });

    },

    getUsers: (users: Array<UserEntity>) => {

        return users.map((user: UserEntity) => {

            return {
                id: user.id,
                userName: user.name,
                cpf: user.cpf,
                email: user.email,
                userType: user.fkUserType.name,
            }
        });

    },

    getLegalPerson: (users: Array<UserEntity>, address: Array<AddressEntity>) => {

        return users.map((user: UserEntity, index: number) => {

            return {
                id: user.id,
                userName: user.name,
                email: user.email,
                cpfcnpj: user.fkCompany.cpfcnpj,
                userType: user.fkUserType.name,
                companyName: user.fkCompany.companyName,
                corporateName: user.fkCompany.corporateName,
                address: {
                    state: address[index].fkState.name,
                    city: address[index].city,
                    district: address[index].district,
                    street: address[index].street,
                    phoneNumber: address[index].phoneNumber.toString(),
                    addressNumber: address[index].addressNumber,
                    addressCodePostal: address[index].addressCodePostal.toString(),
                },

            }
        });

    },

    storeCompany: (user: UserEntity, address: AddressEntity) => {

        return {
            name: user.name,
            cpfcnpj: user.fkPlatform.fkCompany.cpfcnpj,
            platformName: user.fkPlatform.name,
            state: address.fkState.name,
            city: address.city,
            district: address.district,
            street: address.street,
            phoneNumber: address.phoneNumber,
        };

    },

    storeClient: (user: UserEntity, address: AddressEntity) => {

        return {
            name: user.name,
            corporateName: user.fkCompany.corporateName,
            cnpj: user.fkCompany.cpfcnpj,
            state: address.fkState.name,
            city: address.city,
            district: address.district,
            street: address.street,
            phoneNumber: address.phoneNumber,
        };

    },

    store: (user: UserEntity, address: AddressEntity) => {

        return {
            name: user.name,
            userType: user.fkUserType,
            state: address.fkState.name,
            city: address.city,
            district: address.district,
            street: address.street,
            phoneNumber: address.phoneNumber,
        };

    },

    cep: (cep: Address) => {

        return {
            city: cep.city,
            complement: cep.complement,
            state: cep.state,
            street: cep.street,
            neighborhood: cep.neighborhood,
        };

    },

    patchClient: (user: UserEntity, address: AddressEntity) => {

        return {
            name: user.name,
            cnpj: user.fkCompany.cpfcnpj,
            platformName: user.fkPlatform.name,
            state: address.fkState.name,
            city: address.city,
            district: address.district,
            street: address.street,
            phoneNumber: address.phoneNumber,
        };

    },

    patchCollaborator: (user: UserEntity, address: AddressEntity) => {

        return {
            name: user.name,
            cpf: user.cpf,
            city: address.city,
            district: address.district,
            street: address.street,
            phoneNumber: address.phoneNumber,
        };

    },

};
