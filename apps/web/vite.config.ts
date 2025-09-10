import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { join } from 'node:path'

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
