var gulp = 		require('gulp'),
	sass = 		require('gulp-sass'),
	jade = 		require('gulp-jade'),
	concat = 	require('gulp-concat'),
	uglify = 	require('gulp-uglify'),
	rename = 	require('gulp-rename');

gulp.task('default', ['build']);

gulp.task('build', ['sass', 'jade', 'scripts']);

gulp.task('watch', ['sass', 'jade', 'scripts'], function(){
	gulp.watch(['project/components/**/*.scss', 'project/styles/*.scss'], ['sass']);
	gulp.watch(['project/components/**/*.js', 'project/scripts/*.js'], ['scripts']);
	gulp.watch(['project/components/**/*.jade', 'project/*.jade'], ['jade']);
});

gulp.task('sass', function(){
	return gulp.src(['project/styles/main.scss'])
	.pipe(sass())
	.pipe(gulp.dest('public/styles'));
});

gulp.task('jade', function(){
	return gulp.src(['project/components/**/*.jade', 'project/*.jade'])
	.pipe(jade())
	.pipe(rename(function(path){
		path.basename = 'index';
	}))
	.pipe(gulp.dest('craft/templates'));
});

gulp.task('scripts', function(){
	return gulp.src(['project/components/**/*.js', 'project/scripts/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/scripts'));
});