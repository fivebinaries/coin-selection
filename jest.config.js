module.exports = {
  rootDir: '.',
  resetMocks: true,
  testEnvironment: 'node',
  bail: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  coverageReporters: ['json-summary', 'lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
  coverageThreshold: {
    // global: {
    //   branches: 37,
    //   functions: 28,
    //   lines: 40,
    //   statements: 40,
    // },
  },
};
