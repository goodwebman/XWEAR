import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

import path from 'path' // Import path

export default defineConfig({
	base: '/XWEAR/',
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
})
