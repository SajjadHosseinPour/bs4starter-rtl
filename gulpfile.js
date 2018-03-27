const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

//Optimize Images
gulp.task('imageMin', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

// Compile Sass
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap-v4-rtl/scss/bootstrap-rtl.scss','src/css/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Move Js Files to dist
gulp.task('moveJs', function(){
    return gulp.src(['node_modules/bootstrap-v4-rtl/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Watch Sass and Server
gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server:"./dist"
    });
    gulp.watch(['node_modules/bootstrap-v4-rtl/scss/bootstrap-rtl.scss','src/css/*.scss'],['sass']);
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
});

//Move Awesome Fonts to dist/fonts
gulp.task('fonts',function(){
    return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
})

// Move Font Awesome CSS
gulp.task('fa',function(){
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('dist/css'));
});

//Move mdbootstrap css to dist
gulp.task('mdbootstrapCss',function(){
    return gulp.src('node_modules/mdbootstrap/css/mdb.min.css')
    .pipe(gulp.dest('dist/css'));
});

//move mdboostrap svgs to dist
gulp.task('mdbootstrapSvg',function(){
    return gulp.src('node_modules/mdbootstrap/img/svg/*.svg')
    .pipe(gulp.dest('dist/img/svg'));
});
//Move mdbootstrap js to dist
gulp.task('mdbootstrapJs',function(){
    return gulp.src('node_modules/mdbootstrap/js/mdb.min.js')
    .pipe(gulp.dest('dist/js'));
});
//Move Roboto Fonts (mdbootstrap default font) to dist/fonts
gulp.task('robotoFont', function(){
    return gulp.src('node_modules/mdbootstrap/font/roboto/*')
    .pipe(gulp.dest('dist/fonts/roboto'));
});

gulp.task('default' , ['imageMin','moveJs','serve','fonts','fa','mdbootstrapCss','mdbootstrapJs','robotoFont','mdbootstrapSvg']);

