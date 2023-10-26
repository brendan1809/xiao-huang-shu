/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  [
    /** Enables baseUrl: "./" option in tsconfig.json to work @see https://github.com/entwicklerstube/babel-plugin-root-import */
    "babel-plugin-root-import",
    {
      paths: [
        {
          rootPathPrefix: "app/",
          rootPathSuffix: "app",
        },
        {
          rootPathPrefix: "assets/",
          rootPathSuffix: "assets",
        },
      ],
    },
  ],
  [
    "@tamagui/babel-plugin",
    {
      components: ["tamagui"],
      config: "./tamagui.config.ts",
      logTimings: true,
    },
  ],
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  "@babel/plugin-proposal-export-namespace-from",

  [
    "module-resolver",
    {
      cwd: "./",
      root: ["./app"],
      alias: {
        assets: "./assets",
        components: "./app/components",
        containers: "./app/containers",
        i18n: "./app/i18n",
        config: "./app/config",
        utils: "./app/utils",
        models: "./app/models",
        screens: "./app/screens",
        theme: "./app/theme",
        colors: "./app/theme/colors",
      },
      extensions: [".ts", ".tsx"],
    },
  ],

  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  "react-native-reanimated/plugin",
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins,
}
