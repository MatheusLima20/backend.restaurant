export interface SaveTables {
    save: (tables: Array<SaveTables.Params>) => Promise<void>;
}

namespace SaveTables {
    export type Params = {
        id: number;

        name: string;

        isActive: boolean;

        fkPlatform: number;

        createdBy: number;

        updatedBy: number;

        createdAt: Date;

        updatedAt: Date;
    };
}
