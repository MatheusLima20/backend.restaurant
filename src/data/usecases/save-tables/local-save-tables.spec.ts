import { CacheStore } from "@/data/protocols/cache";
import { LocalSaveTables } from "@/data/usecases";


type SutTypes = {
    sut: LocalSaveTables;
    cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSaveTables(cacheStore);

    return {
        sut,
        cacheStore,
    };
};

describe("LocalSalveTable", () => {
    test("Should not delete cache on sut.init", () => {
        const cacheStore = new CacheStoreSpy();
        new LocalSaveTables(cacheStore);
        expect(cacheStore.deleteCallsCount).toBe(0);
    });

    test("Should delete old cache on sut.save", async () => {
        const { sut, cacheStore } = makeSut();
        await sut.save();
        expect(cacheStore.deleteCallsCount).toBe(1);
        expect(cacheStore.key).toBe('table');
    });
});



class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0;
    key: string = "";

    delete(key: string): void {
        this.deleteCallsCount++;
        this.key = key;
    }
}
