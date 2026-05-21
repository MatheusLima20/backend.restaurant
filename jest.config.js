export const roots = ["<rootDir>/src"];
export const testEnvironment = "node";
export const transform = {
    ".+\\.ts$": "ts-jest",
};
export const moduleNameMapper = {
    "@/(.+)": "<rootDir>/src/$1",
};
