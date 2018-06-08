import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';
import sass from 'gulp-sass';

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import contentWebpackConfig from './content/webpack.config';
import assetsWebpackConfig from './assets/webpack.config';

import ENV from './gulp.config';

const { enableDebugging } = ENV;

const plugins = loadPlugins();

gulp.task('assets', (cb) => {
    webpack(assetsWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        enableDebugging && plugins.util.log('[webpack]', stats.toString());
        cb();
    });
});

gulp.task('popup-js', (cb) => {
    webpack(popupWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);
        
        enableDebugging && plugins.util.log('[webpack]', stats.toString());
        cb();
    });
});

gulp.task('event-js', (cb) => {
    webpack(eventWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        enableDebugging && plugins.util.log('[webpack]', stats.toString());
        cb();
    });
});

gulp.task('content-js', (cb) => {
    webpack(contentWebpackConfig, (err, stats) => {
        if (err) 
            throw new plugins.util.PluginError('webpack', err);

        enableDebugging && plugins.util.log('[webpack]', stats.toString());
        cb();
    });
});

gulp.task('content-css', () => {
    return gulp.src('content/src/stylesheets/content.css')
        .pipe(gulp.dest('./build'))
});

gulp.task('content-sass',(cb) => {
    return gulp.src('./content/src/stylesheets/sass/content.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./content/src/stylesheets'));
});

gulp.task('popup-html', () => {
    return gulp.src('popup/src/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('popup-css', () => {
    return gulp.src('popup/src/stylesheets/popup.css')
        .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', () => {
    return gulp.src('manifest.json')
        .pipe(gulp.dest('./build'));
});


// Clean task
gulp.task('clean', (cb) => {
    rimraf.sync('./build');
    cb();
});

gulp.task('clean_assets', (cb) => {
    rimraf('./build/assets', cb);
});

gulp.task('clean_event', (cb) => {
    rimraf('./build/event.js',cb);
});

gulp.task('clean_popup', (cb) => {
    rimraf('./build/popup.*',cb);
});

gulp.task('clean_content', (cb) => {
    rimraf('./build/content.*',cb);
});

gulp.task('clean_content_css', (cb) => {
    rimraf('./build/content.css',cb);
});

gulp.task('clean_manifest', (cb) => {
    rimraf('./build/manifest.json',cb);
});

// Aggregrated Task
gulp.task('build', ['clean','assets','copy-manifest', 'popup-js', 'popup-html', 'popup-css', 'event-js', 'content-js', 'content-css']);

gulp.task('watch', ['build'], () => {
    gulp.watch('assets/**/*', ['clean_assets','assets']);
    gulp.watch('popup/**/*', ['clean_popup','popup-html','popup-css','popup-js']);   
    gulp.watch('content/src/scripts/**/*', ['clean_content','content-css','content-js']);
    gulp.watch('content/src/stylesheets/sass/**/*', ['clean_content_css','content-sass','content-css']);
    gulp.watch('event/**/*', ['clean_event','event-js']);
    gulp.watch('utils/**/*', ['clean_event','clean_content','content-css','content-js','event-js']);
    gulp.watch('manifest.json',['clean_manifest','copy-manifest']);
});

gulp.task('default', ['build']);