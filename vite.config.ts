
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'radix-ui': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar'],
            'motion': ['motion/react', 'framer-motion'],
            'recharts': ['recharts'],
          }
        }
      }
    },
    server: {
      port: 3000,
      open: true,
    },
  });