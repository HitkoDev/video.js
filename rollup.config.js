import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const escapeStringRegexp = require('escape-string-regexp')

const swfv = require('videojs-swf/package.json').version
const swfr = new RegExp(escapeStringRegexp("require('videojs-swf/package.json').version"), 'igm')
const pkgv = require('./video.js/package.json').version
const pkgr = new RegExp(escapeStringRegexp("require('../../package.json').version"), 'igm')

export default {
	entry: './video.js/src/js/video.js',
	plugins: [
		{
			name: 'replace',

			transform(code, id) {
				return code.replace(swfr, '"' + swfv + '"').replace(pkgr, '"' + pkgv + '"')
			}
		},
		nodeResolve({
			jsnext: true,
			main: true
		}),
		commonjs()
	],
	dest: './dist/video.ts',
	format: 'iife',
	moduleName: 'videojs'
}