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

        const themeData = JSON.parse(plugins.fs.readFileSync('../theme.json'));

        let style_editor_default = `
body .is-layout-flow {
    > * + * {
        margin-block-start: 0;
        margin-block-end: 0;
    }
    
    > p {
        margin-block-start: ${themeData['styles']['blocks']['core/paragraph']['spacing']['margin']['top']};
        margin-block-end: ${themeData['styles']['blocks']['core/paragraph']['spacing']['margin']['bottom']};
        
        &:last-child {
            margin-block-end: 0;
        }
    }
    
    > p + p {
        margin-block-start: ${themeData['styles']['blocks']['core/paragraph']['spacing']['margin']['top']};
        margin-block-end: ${themeData['styles']['blocks']['core/paragraph']['spacing']['margin']['bottom']};
    }
    
    > h1, > h1 + h1,
    > h2, > h2 + h2,
    > h3, > h3 + h3,
    > h4, > h4 + h4,
    > h5, > h5 + h5,
    > h6, > h6 + h6 {
        margin-block-start: ${themeData['styles']['elements']['heading']['spacing']['margin']['top']};
        margin-block-end: ${themeData['styles']['elements']['heading']['spacing']['margin']['bottom']};
    }
}
    `

        return gulp.src(src.main, {allowEmpty: true})
            .pipe(plugins.plumber({errorHandler: onError}))
            .pipe(plugins.if(file => file.path.endsWith('style-editor.scss'), plugins.insert.prepend(style_editor_default)))
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
