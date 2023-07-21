/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testPathIgnorePatterns: ['<rootDir>/build/'],
  setupFilesAfterEnv: ['./tests/setupTests.ts'],
};