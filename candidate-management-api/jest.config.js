module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: [
    "./src/__tests__/setup.ts",
    "./src/__tests__/teardown.ts",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
};
