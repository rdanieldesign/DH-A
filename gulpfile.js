var gulp = 		require('gulp'),
	sass = 		require('gulp-sass'),
	jade = 		require('gulp-jade'),
	concat = 	require('gulp-concat'),
	uglify = 	require('gulp-uglify'),
	rename = 	require('gulp-rename'),
	del =		require('del'),
	browserSync = require('browser-sync');

gulp.task('default', ['build:local', 'build:craft']);

gulp.task('build:local', ['sass-local', 'jade-local', 'scripts-local']);
gulp.task('build:craft', ['sass-craft', 'jade-craft', 'scripts-craft']);

gulp.task('browserSync', function() {
    browserSync({
        notify: false,
        open: true,
        server: {
            baseDir: "./tmp/templates/homepage"
        }
    });
});

gulp.task('watch', ['build:local', 'browserSync'], function(){
	gulp.watch(['project/components/**/*.scss', 'project/styles/*.scss'], ['sass-local']);
	gulp.watch(['project/components/**/*.js', 'project/scripts/*.js'], ['scripts-local']);
	gulp.watch(['project/components/**/*.jade', 'project/pages/**/*.jade', 'project/*.jade'], ['jade-local']);
});

gulp.task('clean-local', function(){
	return del('tmp/**/*');
});

gulp.task('sass-local', function(){
	return gulp.src(['project/styles/main.scss'])
	.pipe(sass())
	.pipe(gulp.dest('tmp/styles'))
	.pipe(browserSync.stream());
});

gulp.task('sass-craft', function(){
	return gulp.src(['project/styles/main.scss'])
	.pipe(sass())
	.pipe(gulp.dest('public/styles'));
});

gulp.task('jade-local', function(){
	return gulp.src('project/pages/**/*.jade')
	.pipe(jade({
		pretty: true,
		locals: {
			devMode: true
		}
	}))
	.pipe(rename(function(path){
		path.basename = 'index';
	}))
	.pipe(gulp.dest('tmp/templates')),
	gulp.src('project/*.jade')
	.pipe(jade({
		pretty: true,
		locals: {
			devMode: true
		}
	}))
	.pipe(gulp.dest('tmp/templates'))
	.pipe(browserSync.stream());
});

gulp.task('jade-craft', function(){
	return gulp.src('project/pages/**/*.jade')
	.pipe(jade({
		pretty: true,
		locals: {
			devMode: false
		}
	}))
	.pipe(rename(function(path){
		path.basename = 'index';
	}))
	.pipe(gulp.dest('craft/templates')),
	gulp.src('project/*.jade')
	.pipe(jade({
		pretty: true,
		locals: {
			devMode: false
		}
	}))
	.pipe(gulp.dest('craft/templates'));
});

gulp.task('scripts-local', function(){
	return gulp.src(['project/components/**/*.js', 'project/scripts/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('tmp/scripts'))
	.pipe(browserSync.stream());
});

gulp.task('scripts-craft', function(){
	return gulp.src(['project/components/**/*.js', 'project/scripts/*.js'])
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/scripts'));
});