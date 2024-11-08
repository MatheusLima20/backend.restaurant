export { };
export interface Address {
    cep: string;
    street: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    ibge?: string;
    gia?: string;
    ddd?: string;
    siafi?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    userType: string;
    platform: {
        id: number,
        name: string
    },
}

export interface RequestAuth {
    user: User;
}

declare global {
    namespace Express {
        interface Request {
            auth: RequestAuth;
        }
    }
}