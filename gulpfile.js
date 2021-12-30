const { task, src, dest, watch, series, parallel } = require("gulp");

const htmlmin = require("gulp-htmlmin");

const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
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

task("compileHTML", () => {
	return src("src/**/*.html")
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest("dist"));
});

task("compileSASS", () => {
	return src("src/scss/*.scss", { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([prefix(), minify()]))
		.pipe(dest("dist/css", { sourcemaps: "." }));
});

task("compileJS", () => {
	return src("src/js/main.js", { sourcemaps: true })
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(dest("dist/js", { sourcemaps: "." }));
});

task("optimizePNG", () => {
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
});

task("optimizeSVG", () => {
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
});

task("convertToWebp", () => {
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
});

task("browsersyncServe", (callback) => {
	browsersync.init(
		{
			server: {
				baseDir: "./dist/",
			},
		},
		callback
	);
});

task("browsersyncReload", (callback) => {
	browsersync.reload();
	callback();
});

task("watch", () => {
	watch(
		["src/**/*.html", "src/scss/**/*.scss", "src/js/**/*.js"],
		parallel("base", "browsersyncReload")
	);
});

task(
	"image",
	parallel("optimizePNG", "optimizeSVG", "convertToWebp", () => {
		return src("src/favicon.ico").pipe(dest("dist"));
	})
);

task("base", parallel("compileHTML", "compileSASS", "compileJS"));

task("default", series("base", "browsersyncServe", "watch"));

task("build", parallel("base", "image"));
