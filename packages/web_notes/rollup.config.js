import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
// import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', [ 'run', 'start', '--', '--dev' ], {
				stdio: [ 'ignore', 'inherit', 'inherit' ],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const toRollupConfig = ({
	input = "src/main.ts",
	destFile = 'public/build/bundle.js',
	format = "iife",
	sourcemap = !production,
	customElement = false
}) => ({
	input,
	output: {
		sourcemap,
		format,
		name: 'app',
		file: destFile
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify(production ? 'production' : "dev"),
			__buildDate__: () => JSON.stringify(new Date()),
		}),
		svelte({
			preprocess: sveltePreprocess({ sourceMap: sourcemap }),
			emitCss: false,
			compilerOptions: {
				customElement,
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: true }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: [ 'svelte' ]
		}),
		commonjs(),
		typescript({
			sourceMap: sourcemap,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		// 压缩代码
		// production && terser()
	],
	watch: {
		clearScreen: false
	}
});


export default [
	toRollupConfig({}),
	...(production ? [
		/** 通过 customElement 配置将css打包进js文件  */
		toRollupConfig({ input: "src/App.svelte", destFile: "public/build/web_notes.user.js" }),
	] : [])
];
