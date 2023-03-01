const webpack = require("webpack");
const packageJson = require("./package.json")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const path = require('path')

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    ...config.resolve.fallback,
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    path: require.resolve("path-browserify"),
    process: require.resolve("process"),
    'process/browser': require.resolve("process/browser"),
  }
  config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
  config.plugins[0] = new HtmlWebpackPlugin({
    title: packageJson.name,
    meta: {
      description: packageJson.description
    },
    inject: true,
    template: path.resolve("./") + '/public/index.html'
  })
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
    new HtmlWebpackTagsPlugin({
      useHash: true,
      metas: [
        {
          attributes: {
            name: 'robots',
            content: 'noindex, nofllow'
          }
        },
        {
          attributes: {
            name: 'description',
            property: 'og:description',
            content: packageJson.description
          }
        },
        {
          attributes: {
            name: 'author',
            content: packageJson.author
          }
        },
        {
          attributes: {
            property: 'og:type',
            content: 'website'
          }
        },
        {
          attributes: {
            property: 'og:title',
            content: packageJson.name
          }
        },
        {
          attributes: {
            property: 'og:site_name',
            content: packageJson.name
          }
        },
        {
          attributes: {
            property: 'og:locale',
            content: 'en_US'
          }
        },
        {
          attributes: {
            property: 'og:url',
            content: packageJson.homepage
          }
        },
        {
          attributes: {
            property: 'og:image',
            content: 'https://portfolio.kumoti.jp/avatar_512x512.jpg'
          },
        },
        {
          attributes: {
            property: 'og:image:width',
            content: 512
          },
        },
        {
          attributes: {
            property: 'og:image:height',
            content: 512
          },
        },
        {
          attributes: {
            property: 'og:image:type',
            content: 'image/jpeg'
          },
        },
        {
          attributes: {
            property: 'og:image:alt',
            content: packageJson.name
          },
        },
      ]
    })
  ]

  return config
}
