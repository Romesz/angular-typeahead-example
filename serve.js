/* global require */

var browserSync = require('browser-sync');
browserSync({
  open: true,
  port: 9000,
  server: {
    baseDir: ['./app'],
    middleware: function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  }
});