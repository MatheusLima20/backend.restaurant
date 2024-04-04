import { UserTypeEntity } from "../entity/UserTypeEntity";



export const UserTypeView = {

    get: (UserTypes: Array<UserTypeEntity>) => {

        return UserTypes.map((useType: UserTypeEntity) => {
            return {
                id: useType.id,
                name: useType.name,
            }
        });

    },

}
