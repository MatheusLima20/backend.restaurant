

export const StringFormatter = {

    OnlyNumber: (value: string) => {
        const data: any = value.replace(/[^\d]+/g, '');
        return data;
    }

}
