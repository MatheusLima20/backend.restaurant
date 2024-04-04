import { StatesEntity } from "../entity/StatesEntity";


export const StatesView = {

    get: (states: Array<StatesEntity>) => {

        return states.map((state: StatesEntity) => {
            return {
                id: state.id,
                name: state.name,
                uf: state.uf,
            }
        });

    },

}
