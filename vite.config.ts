import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

enum CONFIG {
  TARGET = 'skin-node-production.up.railway.app'
}
export default ({mode}: {mode: string}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return defineConfig({
    //root: '/src',
    resolve: {
      alias: [
        {find: '@', replacement: resolve(__dirname, './src')},
        {
          find: '@page',
          replacement: resolve(__dirname, './src/page')
        }
      ]
    },
    plugins: [tailwindcss(), react(), tsconfigPaths()],
    optimizeDeps: {
      include: ['pdfjs-dist']
    },
    server: {
      open: true,
      port: 3300,
      hmr: {
        overlay: false
      },
      proxy: {
        '/api': {
          target: `https://${CONFIG.TARGET}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          secure: false
        },
        '/ws': {
          target: `ws://${CONFIG.TARGET}`,
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${Date.now()}.js`,
          chunkFileNames: `assets/[name].${Date.now()}.js`,
          assetFileNames: `assets/[name].${Date.now()}.[ext]`
        }
      }
    }
  });
};
