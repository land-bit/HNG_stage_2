module.exports = {
  testEnvironment: "node",
  transform: { "^.+\\.jsx?$": "babel-jest" },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
};
