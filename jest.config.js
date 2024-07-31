export default {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
};
