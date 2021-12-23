const { src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const purge = require("gulp-purgecss");
const prefix = require("autoprefixer");
const minify = require("cssnano");
const imagemin = require("gulp-imagemin");
const browsersync = require("browser-sync").create();

const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

function scssTask() {
	return src("src/scss/*.scss", { sourcemaps: true })
		.pipe(sass())
		.pipe(purge({ content: ["./*.html"] }))
		.pipe(postcss([prefix(), minify()]))
		.pipe(dest("dist/css", { sourcemaps: "." }));
}

function jsTask() {
	return src("src/js/main.js", { sourcemaps: true })
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(dest("dist/js", { sourcemaps: "." }));
}

function imageTask() {
	return src("src/images/*")
		.pipe(
			imagemin([
				imagemin.gifsicle({ interlaced: true }),
				imagemin.mozjpeg({ quality: 75, progressive: true }),
				imagemin.optipng({ optimizationLevel: 5 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest("dist/images"));
}

function browsersyncServe(callback) {
	browsersync.init(
		{
			server: {
				baseDir: ".",
			},
		},
		callback
	);
}
function browsersyncReload(callback) {
	browsersync.reload();
	callback();
}

function watchTask() {
	watch(
		["*.html", "src/js/**/*.js", "src/scss/**/*.scss", "src/images/*"],
		parallel(jsTask, scssTask, imageTask, browsersyncReload)
	);
}

exports.default = series(
	parallel(jsTask, scssTask, imageTask),
	browsersyncServe,
	watchTask
);
