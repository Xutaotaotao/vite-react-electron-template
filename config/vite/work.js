import { builtinModules } from 'module'
import path from "path";

const config = {
  root: path.resolve(__dirname, '../../src/work'),
  envDir:process.cwd(),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../../src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist/work"),
    assetsDir: '.',
    minify: false,
    target: `node16`,
    lib: {
      entry: path.resolve(__dirname, '../../src/work/index.ts'),
      formats: ['cjs']
    },
    rollupOptions: {
      external: ['electron',...builtinModules],
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
