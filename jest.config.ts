import type { Config } from 'jest'

const config: Config = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: [
    'js',
    'ts'
  ],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: true
      }
    ]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  testMatch: [
    '**/*.test.ts',
    '**/*.spec.ts'
  ],
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'node'
}

export default config
