module.exports = {
  moduleDirectories: ['node_modules', __dirname],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/*.stories.{js,jsx,ts,tsx}',
  ],
  setupFiles: ['<rootDir>/test/setupEnv.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleNameMapper: {
    // Allow `@/` to map in Jest tests
    '@test/(.*)$': '<rootDir>/test/$1',
    '@lib/(.*)$': '<rootDir>/lib/$1',
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}
