import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    deps: {
      inline: ['@babel/types']
    },
    coverage: {
      provider: 'v8' // or 'v8'
      // reporter: 'lcov'
    }
  }
})
