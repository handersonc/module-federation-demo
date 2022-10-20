import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import babel from 'rollup-plugin-babel';


import generatePackageJson from 'rollup-plugin-generate-package-json';


// eslint-disable-next-line no-undef
const { TARGET_ENV } = process.env;

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id),
})

export default [{
  input: './src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  plugins: [
    // replace({
    //   'process.env.NODE_ENV': JSON.stringify(
    //     TARGET_ENV === 'production' ? 'production' : 'development'
    //   ),
    //   preventAssignment: true
    // }),
    commonjs({}),
    resolve(),
    typescript({
      tsconfig: './tsconfig.build.json',
      useTsconfigDeclarationDir: true, 
      declaration: true,
      declarationDir: 'dist',
    }),
    image(),
    postcss(),
    babel({
      exclude: 'node_modules',
    }),
    // dts(),
    // generatePackageJson({
    //   outputFolder: 'dist',
    //   baseContents: (pkg) => ({
    //     name: pkg.name,
    //     main: 'dist/index.js',
    //     peerDependencies: {
    //       'react': '^18.2.0'
    //     },
    //     version: '1.0.0'
    //   })            
    // })
  ]
}];