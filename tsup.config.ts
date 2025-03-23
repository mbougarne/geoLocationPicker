import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  external: ['react', 'react-dom'],
  minify: true,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [],
});
