export default {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "json",
    "text",
    "lcov",
    "clover"
  ],
  coverageThreshold: {
    global: {
      branchs: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  maxWorkers: "50%",
  testEnvironment: "node",
  rootDir: '.',
  testMatch: ["<rootDir>/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js"],
  watchPathIgnorePatterns: ["node_modules"]
};
