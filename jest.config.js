module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["./tests"],
  silent: false,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["**/*.ts"],
  coverageReporters: ["text"],
  coverageThreshold: {
    global: {
      lines: 98,
    },
  },
};
