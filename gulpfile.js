const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const files = {
	scssPath: 'src/scss/*.scss',
    jsPath: 'src/js/*.js'
};

function scssTask() {
    return src(files.scssPath, { sourcemaps: true })
        .pipe(sass())
        .pipe(dest('dist/css', { sourcemaps: '.' }));
}

function jsTask() {
    return src(files.jsPath, { sourcemaps: true })
        .pipe(dest('dist/js', { sourcemaps: '.' }));
}

function watchTask() {
    watch(['src/scss/**/*.scss', files.jsPath], parallel(scssTask, jsTask));
}

exports.default = series(parallel(scssTask, jsTask), watchTask);