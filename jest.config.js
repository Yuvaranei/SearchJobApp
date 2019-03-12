module.exports = {
    automock: false,
    browser: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'jsx'],
    moduleDirectories: ["node_modules"],
    setupFiles: ['<rootDir>/enzyme.config.js'],
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    testURL: 'http://localhost',
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    verbose: true,
  };