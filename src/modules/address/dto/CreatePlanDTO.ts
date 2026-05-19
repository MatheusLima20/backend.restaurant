import { AddressEntity } from "../entities/AddressEntity";


export type CreateAddressDTO = Omit<
  AddressEntity,
  'id' | 'createdAt' | 'updatedAt'
>;