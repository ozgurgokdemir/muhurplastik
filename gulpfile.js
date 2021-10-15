const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const files = {
    html: 'src/*.html',
	scss: 'src/scss/*.scss',
    js: 'src/js/*.js'
};

function htmlTask() {
    return src(files.html)
        .pipe(dest('dist/'));
}

function scssTask() {
    return src(files.scss, { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('dist/css', { sourcemaps: '.' }));
}

function jsTask() {
    return src(files.js, { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

function watchTask() {
    watch(['src/*.html', 'src/scss/**/*.scss', 'src/js/**/*.js'], parallel(htmlTask, scssTask, jsTask));
}

exports.default = series(parallel(htmlTask, scssTask, jsTask), watchTask);