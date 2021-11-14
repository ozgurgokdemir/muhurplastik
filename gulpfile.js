const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();

const files = {
	scss: 'src/scss/*.scss',
    js: 'src/js/*.js',
    img: 'src/images/*'
};

function scssTask() {
    return src(files.scss, { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('dist/css', { sourcemaps: '.' }));
}

function jsTask() {
    return src(files.js, { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

function imageTask() {
    return src(files.img)
        .pipe(dest('dist/images'));
}

function browsersyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}
function browsersyncReload(cb) {
    browsersync.reload();
    cb();
}

function watchTask() {
    watch(['*.html', 'src/scss/**/*.scss', 'src/js/**/*.js', 'src/images/*'], parallel(scssTask, jsTask, imageTask, browsersyncReload));
}

exports.default = series(parallel(scssTask, jsTask, imageTask), browsersyncServe, watchTask);