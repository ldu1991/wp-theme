module.exports = function (gulp, plugins, mobileSettings) {
    function onError(e) {
        console.log(e.toString());
        this.emit('end');
    }

    /* Paths */
    let src = {
            script: './js/script.js',
            admin: './js/admin.js'
        },
        dist = {
            main: '../assets/js'
        };
    /* End Paths */


    return function () {
        let scripts = Object.entries(src).map(([key, value]) => {
            return plugins.browserify({entries: value})
                .transform(plugins.babelify.configure({
                    presets: [
                        "@babel/preset-env"
                    ]
                }))
                .bundle()
                .pipe(plugins.source(key + '.js'))
                .pipe(plugins.if(mobileSettings, plugins.buffer()))
                .pipe(plugins.if(mobileSettings, plugins.uglify()))
                .pipe(gulp.dest(dist.main))
        })

        return plugins.merge(scripts);
    }
}
