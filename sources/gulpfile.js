'use strict';

const browserSync   = require('browser-sync').create(),
    fs              = require('fs'),
    webpack         = require('webpack-stream'),
    gulp            = require('gulp'),
    sass            = require('gulp-sass')(require('sass')),
    clean           = require('gulp-clean'),
    plumber         = require('gulp-plumber'),
    gulpIf          = require('gulp-if'),
    insert          = require('gulp-insert'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    changedInPlace  = require('gulp-changed-in-place'),
    csso            = require('gulp-csso')

// https://sass-lang.com/documentation/breaking-changes/slash-div

/* Paths and variables */
let domain = 'test-template';
/* End Paths and variables */

function onError(e) {
    console.log(e.toString());
    this.emit('end');
}

/* Service tasks */
function cleanCssMaps(cb) {
    gulp.src('../assets/css/maps', {read: false})
        .pipe(clean({force: true}))
    cb()
}
/* End Service tasks */

/* CSS */
const themeData = JSON.parse(fs.readFileSync('../theme.json'));
let style_editor_default = `body .is-layout-flow {
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
}`


let elements = {
    'heading': '.h1, .h2, .h3, .h4, .h5, .h6',
    'h1': '.h1',
    'h2': '.h2',
    'h3': '.h3',
    'h4': '.h4',
    'h5': '.h5',
    'h6': '.h6'
}

function generateSpacing(json, prefix = "") {
    let css = "";

    for (const key in json) {
        const value = json[key];
        if (value !== "") {
            if (typeof value === "object") {
                css += generateSpacing(value, `${prefix}${key}-`);
            } else {
                const kebabCaseKey = `${prefix}${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
                css += `${kebabCaseKey}: ${value}; `;
            }
        }
    }

    return css;
}

function generateTypography(json) {
    let css = "";

    for (const key in json) {
        const value = json[key];
        if (value) {
            css += `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}; `;
        }
    }

    return css;
}

function generateColor(json) {
    let css = "";

    for (const key in json) {
        const value = json[key];
        if (value !== "") {
            if(key === 'gradient') {
                css += 'background:' + value + ';'
            } else if(key === 'background') {
                css += 'background-color:' + value + ';'
            } else if(key === 'text') {
                css += 'color:' + value + ';'
            }
        }
    }

    return css;
}

let additional_header_classes = ''
for (let elementsKey in elements) {
    let elementValue = themeData.styles.elements[elementsKey]

    if(elementValue !== undefined) {
        additional_header_classes += elements[elementsKey] + '{'
        for (let elementKey in elementValue) {

            if (elementKey === 'spacing') {
                additional_header_classes += generateSpacing(elementValue[elementKey])
            } else if (elementKey === 'typography') {
                additional_header_classes += generateTypography(elementValue[elementKey])
            } else if (elementKey === 'color') {
                additional_header_classes += generateColor(elementValue[elementKey])
            }
        }

        additional_header_classes += '}'
    }
}


function scss(cb) {
    gulp.src('./scss/**/[^_]*.scss', {allowEmpty: true})
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulpIf(file => file.path.endsWith('style-editor.scss'), insert.prepend(style_editor_default)))
        .pipe(insert.append(additional_header_classes))
        .pipe(sourcemaps.init())
        .pipe(sass.sync({includePaths: ['./scss/']}))
        .pipe(autoprefixer())
        .pipe(changedInPlace({firstPass: true}))
        .pipe(csso())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('../assets/css'));
    cb();
}
function scssRelease(cb) {
    gulp.src('./scss/**/[^_]*.scss', {allowEmpty: true})
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulpIf(file => file.path.endsWith('style-editor.scss'), insert.prepend(style_editor_default)))
        .pipe(insert.append(additional_header_classes))
        .pipe(sass.sync({includePaths: ['./scss/']}))
        .pipe(autoprefixer())
        .pipe(changedInPlace({firstPass: true}))
        .pipe(csso())
        .pipe(gulp.dest('../assets/css'));
    cb();
}
/* End CSS */


/* JS */
function js(cb) {
    gulp.src('./js/script.js')
        .pipe(webpack(require('./webpack.config.js')(false)))
        .pipe(gulp.dest('../assets/js'));

    cb();
}
function jsRelease(cb) {
    gulp.src('./js/script.js')
        .pipe(webpack(require('./webpack.config.js')(true)))
        .pipe(gulp.dest('../assets/js'));

    cb();
}
/* End JS */

function browserSyncInit(cb) {
    browserSync.init({
        proxy: domain,
        notify: false,
        port: 9000
    })

    gulp.watch([
        '../**/*.php',
        '../assets/css/**/*.css',
        '../assets/js/**/*.js'
    ], {cwd: './'})
        .on('change', function (path, stats) {
            browserSync.reload();
        });
    cb();
}

function watch(cb) {
    gulp.watch('../theme.json', {cwd: './'}, gulp.series(scss, js));
    gulp.watch('./scss/**/*.scss', {cwd: './'}, gulp.series(scss));
    gulp.watch('./js/**/*.js', {cwd: './'}, gulp.series(js));
    cb();
}


exports.release = gulp.series(cleanCssMaps, scssRelease, jsRelease);
exports.default = gulp.series(scss, js, gulp.parallel(browserSyncInit, watch));
