/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  //testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
  collectCoverage: true,
  setupFilesAfterEnv: ['./jest.setup.js']
};