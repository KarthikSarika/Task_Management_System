import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        outDir: 'public',
        emptyOutDir: false,
        rollupOptions: {
            input: {
                app: './src/client/main.js',
            },
            output: {
                entryFileNames: 'js/[name].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.endsWith('.css')) return 'css/style.css';
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
});
