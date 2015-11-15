

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
	scss		: 'libs/css/*.scss',
	scssMain	: 'libs/css/style.scss',
	js			: [
		'libs/js/angular.js',
		'libs/js/angular-animate.js',
		'libs/js/polyfills.js',
		'libs/js/directives.js',
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


gulp.task('scss', function() 
{
	// return gulp.src(selectors.scssMain, {base: folderBase}).pipe(plumber({ errorHandler: onError }))
	// 	.pipe(sourcemaps.init())
	// 		.pipe(sass())
	return sass(selectors.scssMain, {base: folderBase, sourcemap:true}).pipe(plumber({ errorHandler: onError }))
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
			.pipe(concat('libs/js/script.js'))
			//.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
});

gulp.task('img', function() {
	return gulp.src(selectors.img,  {base: folderBase}).pipe(plumber({ errorHandler: onError }))
		.pipe(gulp.dest(folderDest))
		.pipe(connect.reload());
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