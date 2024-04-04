import { ProfileEntity } from "../entity/ProfileEntity";

export const ProfileView = {
    getByUserId: (profile: ProfileEntity) => {
        return {
            orderAverage: profile.orderAverage,
        };
    },
};
