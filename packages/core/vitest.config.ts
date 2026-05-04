import { join } from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        include: ['__test__/**/*.test.ts'],
        coverage: {
            reporter: 'text',
            include: ['src/**/*.ts'],
            exclude: ['src/**/index.ts']
        }
    },
    resolve: {
        alias: {
            '~': join(process.cwd(), 'src')
        }
    }
})
