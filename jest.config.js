module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Add any module name mappers if needed
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testMatch: ['**/*.test.tsx', '**/*.test.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};