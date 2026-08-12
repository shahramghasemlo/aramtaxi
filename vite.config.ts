import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // For GitHub Pages deployment
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || env.GITHUB_PAGES === 'true';
  const base = isGitHubPages ? '/aram_taxi/' : '/';
  
  return {
    base: base,
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env': {
        ...env,
        BASE_URL: JSON.stringify(base)
      }
    },
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, '.') }
      ]
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    publicDir: 'public',
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg']
  };
});
