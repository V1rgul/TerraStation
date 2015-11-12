

var gulp 		= require('gulp'),
	gutil		= require('gulp-util'),
	plumber		= require('gulp-plumber'),
	connect		= require('gulp-connect'),
	concat		= require('gulp-concat'),
	sass 		= require('gulp-sass'),
	sourcemaps  = require('gulp-sourcemaps');

var folderBase = "src/", folderDest = "www/";

var selectors = {
	html		: folderBase + '*.html',
	fonts		: folderBase + 'libs/fonts/*',
	scss		: folderBase + 'libs/css/*.scss',
	scssMain	: folderBase + 'libs/css/style.scss',
	js			: folderBase + 'libs/js/*.js',
	img			: folderBase + 'libs/img/*.{png,gif,jpg,svg}'
};


var onError = function (err) {
  gutil.beep();
  console.log(err);
  //this.emit('end');
};


gulp.task('html', function() 
{
	return gulp.src(selectors.html, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload())	
});

gulp.task('fonts', function() 
{
	return gulp.src(selectors.fonts, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload())	
});


gulp.task('scss', function() 
{
	return gulp.src(selectors.scssMain, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
            .pipe(sass())
        .pipe(sourcemaps.write('.'))  
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload())	
});

gulp.task('js', function() 
{
	return gulp.src(selectors.js, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(concat('libs/js/script.js'))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload())	
});

gulp.task('img', function() {
	return gulp.src(selectors.img,  {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload())	
});


gulp.task('all', ['html', 'fonts', 'scss', 'js', 'img'], function(){} );

gulp.task('watch', ['all'], function() {
	gulp.watch(selectors.html, 	['html']);
	gulp.watch(selectors.scss, 	['scss']);
	gulp.watch(selectors.js, 	['js']  );
	gulp.watch(selectors.img, 	['img'] );
	gulp.watch(selectors.fonts,	['fonts'] );
});


gulp.task('server', function() {
	connect.server({
		root: folderDest,
		port: 8080,
		livereload: true
	});
});

gulp.task('default', ['watch', 'server']);