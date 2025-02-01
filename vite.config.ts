import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite';

import path from 'path'; // Import path

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
		  '@': path.resolve(__dirname, 'src'), // Alias for src folder
		},
	  },
})

