import { UserTypeEntity } from "../entities/UserTypeEntity";


export const UserTypeView = {
    get: (UserTypes: Array<UserTypeEntity>) => {
        return UserTypes.map((useType: UserTypeEntity) => {
            return {
                id: useType.id,
                name: useType.name,
            };
        });
    },
};
