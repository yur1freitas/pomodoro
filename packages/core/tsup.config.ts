import { defineConfig } from 'tsup'
import { join } from 'node:path'

const tsconfig = join(process.cwd(), 'tsconfig.json')

const entry = {
    'models/index': './src/models/index.ts'
}

export default defineConfig({
    entry,
    tsconfig,
    format: 'esm',
    target: 'esnext',
    dts: true,
    clean: true,
    minify: true,
    keepNames: true,
    splitting: false,
    skipNodeModulesBundle: true
})
