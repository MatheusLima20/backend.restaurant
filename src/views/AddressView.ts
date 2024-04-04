import { AddressEntity } from "../entity/AddressEntity";


export const AddressView = {

    getById: (address: AddressEntity) => {

        return {
            city: address.city,
            state: address.fkState.name,
            street: address.street,
            district: address.district,
            phoneNumber: address.phoneNumber.toString(),
            addressNumber: address.addressNumber.toString(),
            addressCodePostal: address.addressCodePostal.toString(),
        }

    }

}
