var gulp = 		require('gulp'),
	sass = 		require('gulp-sass'),
	jade = 		require('gulp-jade'),
	concat = 	require('gulp-concat'),
	uglify = 	require('gulp-uglify'),
	rename = 	require('gulp-rename'),
	del =		require('del');

gulp.task('default', ['build:local']);

gulp.task('build:local', ['clean-local', 'sass-local', 'jade-local', 'scripts-local']);
gulp.task('build:craft', ['sass-craft', 'jade-craft', 'scripts-craft']);

gulp.task('watch', ['build:local'], function(){
	gulp.watch(['project/components/**/*.scss', 'project/styles/*.scss'], ['sass']);
	gulp.watch(['project/components/**/*.js', 'project/scripts/*.js'], ['scripts']);
	gulp.watch(['project/components/**/*.jade', 'project/*.jade'], ['jade']);
});

gulp.task('clean-local', function(){
	return del('.tmp/**/*');
});

gulp.task('sass-local', function(){
	return gulp.src(['project/styles/main.scss'])
	.pipe(sass())
	.pipe(gulp.dest('.tmp/styles'));
});

gulp.task('sass-craft', function(){
	return gulp.src(['project/styles/main.scss'])
	.pipe(sass())
	.pipe(gulp.dest('public/styles'));
});

gulp.task('jade-local', function(){
	return gulp.src(['project/components/**/*.jade', 'project/*.jade'])
	.pipe(jade({
		pretty: true,
		locals: {
			devMode: true
		}
	}))
	.pipe(rename(function(path){
		path.basename = 'index';
	}))
	.pipe(gulp.dest('.tmp/templates'));
});

gulp.task('jade-craft', function(){
	return gulp.src(['project/components/**/*.jade', 'project/*.jade'])
	.pipe(jade({
		pretty: true,
		locals: {
			devMode: false
		}
	}))
	.pipe(rename(function(path){
		path.basename = 'index';
	}))
	.pipe(gulp.dest('craft/templates'));
});

gulp.task('scripts-local', function(){
	return gulp.src(['project/components/**/*.js', 'project/scripts/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('scripts-craft', function(){
	return gulp.src(['project/components/**/*.js', 'project/scripts/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/scripts'));
});