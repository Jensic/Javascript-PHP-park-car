var gulp = require('gulp');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bs = require('browser-sync').create();
var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');
var growlNotifier = growl();
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var eslint = require('gulp-eslint');

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
    //return gulp.src('src/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs())
    .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!',
            notifier: growlNotifier
        }))
    .pipe(gulp.dest('./js'))

});

gulp.task('sass', function() {

    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(bs.reload({ stream: true }))

});

gulp.task('browser-sync', ['sass'], function() {

    bs.init({
        server: {
            baseDir: "./"
        }
    })

});

gulp.task('jscs', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!',
            notifier: growlNotifier
        }))
});

gulp.task('lint', function() {
    gulp.src('src/js/**/*.js')
        //.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }))
});

gulp.task('eslint', () => {
    // ESLint ignores files with "node_modules" paths. 
    // So, it's best to have gulp ignore the directory as well. 
    // Also, Be sure to return the stream from the task; 
    // Otherwise, the task may end before the stream has finished. 
    return gulp.src(['src/js/**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});
 
gulp.task('default', ['lint'], function () {
    // This will only run if the lint task is successful... 
});

gulp.task('watch',['browser-sync'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('*.html').on("change", bs.reload);
});