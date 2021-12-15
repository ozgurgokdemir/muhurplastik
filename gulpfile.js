const { src, dest, watch, series, parallel } = require("gulp");

const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();

const files = {
	js: "src/js/main.js",
	scss: "src/scss/*.scss",
	img: "src/images/*",
};

function jsTask() {
	return src(files.js, { sourcemaps: true })
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(dest("dist/js", { sourcemaps: "." }));
}

function scssTask() {
	return src(files.scss, { sourcemaps: true })
		.pipe(sass())
		.pipe(dest("dist/css", { sourcemaps: "." }));
}

function imageTask() {
	return src(files.img).pipe(dest("dist/images"));
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
