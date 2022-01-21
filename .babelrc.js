module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // useBuiltIns: 'usage',
          // corejs: 3,
          modules: false
          // targets: {
          //   ie: '10'
          // }
          // useBuiltIns: 'usage'
        }
      ],
      // '@babel/preset-typescript'
      [
        '@babel/preset-typescript',
        {
          // allowDeclareFields: true,
          // isTSX:true, //关键配置
          // allExtensions: true, //关键配置
          // allowNamespaces:true,
          // onlyRemoveTypeImports:true
        }
      ]
    ],
    // ignore: [
    //   /\/core-js/,
    // ],
    // ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
    // runtimeHelpers:true,
    // 我们这边不做处理，交由外部处理
    plugins: [
      '@babel/proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      // '@babel/runtime-corejs3/helpers/defineProperty',
      // '@babel/runtime-corejs3/helpers/classCallCheck',
      // '@babel/runtime-corejs3/helpers/createClass',
      // '@babel/plugin-proposal-nullish-coalescing-operator',
      // '@babel/plugin-proposal-optional-chaining',
      [
        // profill
        // '@babel/plugin-transform-runtime'
        '@babel/plugin-transform-runtime',
        {
          helpers: true,
          // corejs: false,
          // regenerator: false
          corejs: 3
          // useESModules: true
        }
      ]
    ]
  }
}
