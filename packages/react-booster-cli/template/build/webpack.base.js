const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const { getStyleFileLoaders, getPAGES } = require('./webpack.utils');

// 配置页面及打包入口
const { entry, htmlWebpackPlugins } = getPAGES();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  stats: 'errors-only',
  entry,
  output: {
    filename: 'js/[name]_[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true, // 相当于CleanWebpackPlugin的作用
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.scss',
      '.less',
    ],
  },
  cache: { // 开启缓存
    type: isProd ? 'filesystem' : 'memory',
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          'thread-loader',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        // css
        test: /\.css$/,
        use: getStyleFileLoaders(),
      },
      {
        test: /\.scss$/,
        use: getStyleFileLoaders('sass-loader'),
      },
      {
        test: /\.less$/,
        use: getStyleFileLoaders('less-loader'),
      },
      {
        // 图片
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        parset: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'img/[name][hash][ext][query]',
        },
      },
      {
        // 字体
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    ...htmlWebpackPlugins,
    process.env.bundleReport === 'true' && new BundleAnalyzerPlugin(),
    new FriendlyErrorsPlugin(),
    new ESLintPlugin({
      extensions: ['ts', 'tsx', 'js'],
      failOnError: false,
    })
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      minSize: 5000,
      cacheGroups: {
        // react技术栈相关
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'reactVendor',
          chunks: 'all',
          priority: 1,
        },
        defaultVendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'defaultVendor',
          chunks: 'all',
          priority: 0,
        },
      },
    },
  },
};