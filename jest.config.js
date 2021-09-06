module.exports = {
  rootDir: '.',
  resetMocks: true,
  testEnvironment: 'node',
  bail: true,
  moduleFileExtensions: ['ts', 'js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['<rootDir>/test/tests/**/*test.ts'],
  coverageReporters: ['json-summary', 'lcov', 'text', 'text-summary'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc-node/jest'],
  },
  moduleNameMapper: {
    // Workaround for an error "Cannot find module @emurgo/cardano-serialization-lib-browser"
    "@emurgo/cardano-serialization-lib-browser": "@emurgo/cardano-serialization-lib-nodejs",
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
