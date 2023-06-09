import { builtinModules } from 'module'
import path from "path";

const config = {
  root: process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../dist/main"),
    minify: false,
    target: `node16`,
    lib: {
      entry: path.resolve(__dirname, '../src/main/index.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['electron','koffi',"log4js",...builtinModules],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
    emptyOutDir: true,
    brotliSize: false,
    chunkSizeWarningLimit: 2048,
  },
};
export default config;
