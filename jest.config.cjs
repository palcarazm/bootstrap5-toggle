module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/test/setup/dom.setup.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json"
    }
  }
};
