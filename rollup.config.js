import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
// import camelCase from 'lodash.camelcase'
import { terser } from 'rollup-plugin-terser'

const pkg = require('./package.json')
const isProduction = process.env.NODE_ENV === 'production'

// --libraryname--
const libraryName = 'WebSocketClient'
const extensions = ['.ts', '.js', 'json']
export default {
  input: 'src/index.ts',
  output: [
    { file: pkg.main, name: libraryName, format: 'umd', sourcemap: !isProduction },
    { file: pkg.module, format: 'es', sourcemap: !isProduction }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({ extensions }), //帮助rollup查找npm包路径
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    //将cjs的npm包转成esm,在代码中可以用import引入
    commonjs({ extensions, include: 'node_modules/**' }),
    // commonjs(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    // typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: 'runtime',
      exclude: /^(.+\/)?node_modules\/.+$/,
      // exclude: 'node_modules/**',
      // exclude: [/\/core-js\//],
      // include: [
      //   'src/**'
      // ],
      extensions: ['tsx', 'ts', 'js', 'jsx'] // 超级关键配置
    }),
    // Resolve source maps to the original source
    // sourceMaps()
    isProduction && terser()
  ]
}
