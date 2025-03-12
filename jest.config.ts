import {Config} from "@jest/types"

const config: Config.InitialOptions = {
    setupFilesAfterEnv: [ "jest-extended/all"],
    preset: "ts-jest",
    testEnvironment: "allure-jest/node",
    testRunner: "jest-circus",
    testTimeout:300000,
    testMatch: ["<rootDir>/tests/**/*.tests.ts"]
};
export default config;
