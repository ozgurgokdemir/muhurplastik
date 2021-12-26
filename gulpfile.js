const { task, src, dest, watch, series, parallel } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const purge = require("gulp-purgecss");
const prefix = require("autoprefixer");
const minify = require("cssnano");

const merge = require("merge-stream");
const rename = require("gulp-rename");

const imageResize = require("gulp-image-resize");
const imagemin = require("gulp-imagemin");
const imageminWebp = require("imagemin-webp");
const imageminPngquant = require("imagemin-pngquant");

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

function convertToWebp() {
	const image = (size) => {
		return src("src/images/*.png")
			.pipe(imageResize({ imageMagick: true, width: size }))
			.pipe(imagemin([imageminWebp({ quality: 70 })]))
			.pipe(
				rename({
					suffix: size !== null ? `_${size}w` : "",
					extname: ".webp",
				})
			)
			.pipe(dest("dist/images"));
	};
	return merge([480, 960].map(image));
}

function optimizePNG() {
	return src("src/images/*.png")
		.pipe(imageResize({ imageMagick: true, width: 960 }))
		.pipe(
			imagemin([
				imageminPngquant({
					quality: [0.6, 0.8],
					speed: 1,
				}),
			])
		)
		.pipe(dest("dist/images"));
}

function optimizeSVG() {
	return src("src/images/*.svg")
		.pipe(
			imagemin([
				imagemin.svgo({
					plugins: [
						{
							removeViewBox: false,
						},
					],
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
		parallel(jsTask, scssTask, browsersyncReload)
	);
}

exports.default = series(
	parallel(jsTask, scssTask, optimizePNG, optimizeSVG, convertToWebp),
	browsersyncServe,
	watchTask
);
