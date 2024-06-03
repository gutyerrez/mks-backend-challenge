import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    verbose: true,
    passWithNoTests: true,
    noStackTrace: true,
    testEnvironment: 'node',
    preset: 'ts-jest',
    clearMocks: true,
    testMatch: [
      '**/*.spec.ts'
    ],
    coverageReporters: [
      'text'
    ],
    watchPathIgnorePatterns: [
      '<rootDir>/node_modules/',
      '<rootDir>/dist/',
      '<rootDir>/coverage/'
    ],
    moduleNameMapper: {
      '^@x-spacy/environment/(.*)$': '<rootDir>/src/$1'
    }
  };
};
