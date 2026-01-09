module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup/dom.setup.ts", "<rootDir>/src/test/setup/events.setup.ts"],
  transform: {
      "^.+\\.ts$": ["ts-jest", {
          tsconfig: "tsconfig.test.json",
      }],
  },
  collectCoverageFrom: [
      "src/main/ts/**/*.ts",
      "!**/index.*.ts",
      "!src/main/ts/types/**/*.ts",
  ],
  coverageThreshold: {
      global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
      },
  },
  coverageDirectory: "coverage",
  reporters: [["github-actions", {silent: false}], "summary"],
};
