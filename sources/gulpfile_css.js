module.exports = function (gulp, plugins, mobileSettings, sass) {
    function onError(e) {
        console.log(e.toString());
        this.emit('end');
    }

    /* Paths */
    let src = {
            main: './scss/**/[^_]*.scss'
        },
        dist = {
            main: '../assets/css'
        };
    /* End Paths */

    return function () {

        return gulp.src(src.main, {allowEmpty: true})
            .pipe(plugins.plumber({errorHandler: onError}))
            .pipe(plugins.if(!mobileSettings, plugins.sourcemaps.init()))
            .pipe(sass.sync({includePaths: ['./scss/']}))
            .pipe(plugins.autoprefixer())
            .pipe(plugins.changedInPlace({firstPass: true}))
            .pipe(plugins.csso())
            .pipe(plugins.if(!mobileSettings, plugins.sourcemaps.write('./maps')))
            //.pipe(plugins.debug({title: 'CSS:'}))
            .pipe(gulp.dest(dist.main));

    }
};
