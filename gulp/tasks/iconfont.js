'use strict';

import gulp from 'gulp';
import iconfont from 'gulp-iconfont';
import iconfontCSS from 'gulp-iconfont-css';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import paths from "../paths";

const gp = gulpLoadPlugins();
const runTimestamp = Math.round(Date.now() / 1000);

export default function iconfontTask() {
  return gulp.src(paths.iconfont.src)
    .pipe(iconfontCSS({
      fontName: 'percoicon',
      path: paths.iconfont.template,
      targetPath: path.join(__dirname, '../../src/scss/blocks/_prc-icons.scss'),
      fontPath: '../../fonts/',
      startUnicode: 0xF001
    }))
    .pipe(iconfont({
      fontName: 'percoicon',
      formats: ['ttf', 'eot', 'woff', 'woff2'],
      normalize: true,
      fontHeight: 1001,
      ascent: 850,
      descent: 150,
      timestamp: runTimestamp,
      startUnicode: 0xF001
    }))
    .pipe(gp.debug({title: "Iconfont task"}))
    .pipe(gulp.dest(paths.iconfont.dest))
    .on('error', gp.notify.onError(function (err) {
      return {
        title: "Error task 'iconfont'",
        message: err.message
      }
    }));
}
