import { CacheStore } from "@/data/protocols/cache";

export class LocalSaveTables {
    constructor(private readonly cacheStore: CacheStore ) {}

    async save(): Promise<void> {
        this.cacheStore.delete('table');
    }
}