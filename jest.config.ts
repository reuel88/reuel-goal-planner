// jest.config.ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "^@configs(.*)$": "<rootDir>/src/configs$1",
    "^@constants(.*)$": "<rootDir>/src/constants$1",
    "^@contexts(.*)$": "<rootDir>/src/contexts$1",
    "^@hooks(.*)$": "<rootDir>/src/hooks$1",
    "^@pages(.*)$": "<rootDir>/src/pages$1",
    "^@services(.*)$": "<rootDir>/src/services$1",
    "^@styles(.*)$": "<rootDir>/src/styles$1"
  }
};
export default config;