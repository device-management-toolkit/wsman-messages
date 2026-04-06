import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    exclude: ['dist/**', 'node_modules/**'],
    reporters: process.env.CI ? ['default', 'junit'] : ['default'],
    outputFile: {
      junit: 'junit.xml'
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov']
    }
  }
})
