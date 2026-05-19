import { ProfileEntity } from "../entities/ProfileEntity";


export const ProfileView = {
    getByUserId: (profile: ProfileEntity) => {
        return {
            orderAverage: profile.orderAverage,
        };
    },
};
