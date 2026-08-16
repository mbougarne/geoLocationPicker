import { defineConfig } from 'tsup';
import cssModulesPlugin from 'esbuild-css-modules-plugin';  

export default defineConfig({
  entry: ['src/index.tsx', 'native/src/index.ts'],
  format: ["esm", "cjs"],
  dts: true,
  external: ['react', 'react-dom', 'react-native'],
  minify: true,
  sourcemap: true,
  clean: true,
  esbuildPlugins: [cssModulesPlugin()],
});
