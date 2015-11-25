

var gulp 		= require('gulp'),
	gutil		= require('gulp-util'),
	plumber		= require('gulp-plumber'),
	connect		= require('gulp-connect'),
	concat		= require('gulp-concat'),
	sass 		= require('gulp-ruby-sass'),
	uglify 		= require('gulp-uglify'),
	modernizr	= require('gulp-modernizr'),
	merge2		= require('merge2'),
	sourcemaps  = require('gulp-sourcemaps');

var folderBase = "src/", folderDest = "www/";

var selectors = {
	html		: '*.html',
	fonts		: 'libs/fonts/*',
	css			: 'libs/css/*.css',
	cssAll		: 'libs/css/*.{css,scss}',
	scssMain	: 'libs/css/style.scss',
	js			: [
		'libs/js/angular.js',
		'libs/js/angular-animate.js',
		'libs/js/angular-chart.min.js',
		'libs/js/niceTime.js',
		'libs/js/scripts.js'
	],
	img			: 'libs/img/*.{png,gif,jpg,svg}'
};

Object.keys(selectors).forEach(function(k){
	var o = selectors;
	var v = selectors[k];
	if(!Array.isArray(v)){
		v = [v];
	}
	v = v.map(function(s){
		return folderBase + s;
	});
	selectors[k] = v;
});


var onError = function (err) {
  gutil.beep();
  console.log(err);
  //this.emit('end');
};


gulp.task('html', function() 
{
	return gulp.src(selectors.html, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
});

gulp.task('fonts', function() 
{
	return gulp.src(selectors.fonts, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
});


gulp.task('cssAll', function() 
{
	// return gulp.src(selectors.scssMain, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
	// 	.pipe(sourcemaps.init())
	// 		.pipe(sass())
	return merge2(
			gulp.src(selectors.css, {base: folderBase})
				.pipe(sourcemaps.init()),
			sass(selectors.scssMain, {base: folderBase, sourcemap:true})//.pipe(plumber({ errorHandler: onError }))
		)
		.pipe(concat('libs/css/style.css'))
		.pipe(sourcemaps.write('.'))  
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
});

gulp.task('js', function() {

	return merge2(
			gulp.src(selectors.js, {base: folderBase})
				.pipe(modernizr()),
			gulp.src(selectors.js, {base: folderBase})
		)
		.pipe(sourcemaps.init())
			//.pipe(uglify())
			.pipe(concat('libs/js/script.js', {newLine: '\n//===================================\n'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
});

gulp.task('img', function() {
	return gulp.src(selectors.img,  {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
});


gulp.task('all', ['html', 'fonts', 'cssAll', 'js', 'img'], function(){} );

gulp.task('watch', ['all'], function() {
	gulp.watch(selectors.html, 		['html']);
	gulp.watch(selectors.cssAll, 	['cssAll']);
	gulp.watch(selectors.js, 		['js']  );
	gulp.watch(selectors.img, 		['img'] );
	gulp.watch(selectors.fonts,		['fonts'] );
});


gulp.task('server', function() {
	connect.server({
		root: folderDest,
		port: 8080,
		livereload: true
	});
});

gulp.task('default', ['watch', 'server']);