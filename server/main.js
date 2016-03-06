/* eslint func-names: 0 */
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../build/webpack.config';
import historyApiFallback from 'connect-history-api-fallback';

import config from '../config';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';

const app = express();
const debug = require('debug')('app:server');
const paths = config.utils_paths;

app.use(historyApiFallback({
  verbose: false
}));

// Serve app with Webpack if HMR is enabled
if (config.env === 'development') {
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;

  // Enable webpack-dev-server middleware
  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(paths.client('static')));
} else {
  debug(
    'Application is being run outside of development mode. This starter kit ' +
    'does not provide any production-specific server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(paths.base(config.dir_dist)));
}

export default app;
