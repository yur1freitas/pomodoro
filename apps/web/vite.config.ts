import { join } from 'node:path'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

const root = process.cwd()
const src = './src'

export default defineConfig({
    base: '/pomodoro/',
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '~': join(root, src)
        }
    }
})
