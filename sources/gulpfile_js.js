module.exports = function (gulp, plugins, mobileSettings) {
    function onError(e) {
        console.log(e.toString());
        this.emit('end');
    }

    /* Paths */
    let src = {
            main: './js/script.js'
        },
        dist = {
            main: '../assets/js'
        };
    /* End Paths */

    return function () {
        return plugins.browserify({ entries: src.main})
            .transform(plugins.babelify.configure({
                presets : ["@babel/preset-env"]
            }))
            .bundle()
            .pipe(plugins.source('script.js'))
            .pipe(plugins.if(mobileSettings, plugins.buffer()))
            .pipe(plugins.if(mobileSettings, plugins.uglify()))
            .pipe(gulp.dest(dist.main))
    }
}
