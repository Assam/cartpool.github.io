var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var ghPages = require('gulp-gh-pages');

var buildOutput = './build';
gulp.task('live-server',function(){
    var server = new LiveServer('server/main.js');
    server.start();    
})

gulp.task('build',['copy'],function(){
    return browserify({
        entries:'app/main.jsx',
        debug:true,
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(buildOutput));
})

gulp.task('copy',function(){
    gulp.src([
        'app/*.css',
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'app/*.html',
        'app/*.ejs',
             ]
            )
    .pipe(gulp.dest(buildOutput));
})


gulp.task('serve',['build','live-server'],function(){
    browserSync.init(null,{
        proxy:"http://localhost:7777",
        port: 9001
    })
})

// Deploy to GitHub Pages
gulp.task('deploy', function () {
  return gulp.src(buildOutput + '/**/*')
    .pipe(ghPages({
      remoteUrl: 'https://github.com/Assam/cartpool.github.io.git',
      branch: 'master'
    }));
});
