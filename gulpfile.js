var gulp = require('gulp')
var closureCompiler = require('google-closure-compiler').gulp()
var shell = require('gulp-shell')
var uglify = require('gulp-uglify')
var path = require('path')
var ts = require('gulp-typescript')
var add = require('gulp-add-src')
var rename = require('gulp-rename')
var tpl = require('lodash').template
var fs = require('fs')
var insert = require('gulp-insert')

var pkg = require('./video.js/package.json')
var data = {
    copyright: pkg['copyright'],
    version: pkg['version'],
    includesVtt: true
}
var license = fs.readFileSync('./video.js/build/license-header.txt', 'utf8')
license = tpl(license, {})
license = license(data)

gulp.task('rollup', shell.task([
    path.join('node_modules', '.bin', 'rollup') + ' -c'
]))

gulp.task('transpile', [
    'rollup'
], () => {
    return gulp.src('./dist/video.ts')
        .pipe(ts())
        .pipe(add(['node_modules/videojs-vtt.js/dist/vtt.js']))
        .pipe(closureCompiler({
            js_output_file: 'video.js',
            language_out: 'ECMASCRIPT5',
            warning_level: 'QUIET',
            formatting: 'pretty_print'
        }))
        .pipe(insert.prepend(license + "\n"))
        .pipe(gulp.dest('./dist'))
})

gulp.task('default', [
    'transpile'
], () => {
    return gulp.src(['./dist/video.js'])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(insert.prepend(license))
        .pipe(gulp.dest('./dist'))
})