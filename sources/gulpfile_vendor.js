module.exports = function (gulp, plugins) {
    let vendorDir = './node_modules/',
        vendorArr = {
            'swiper': {
                CSS: 'swiper/swiper-bundle.min.css',
                JS: 'swiper/swiper-bundle.min.js'
            },
            'fancybox': {
                CSS: '@fancyapps/fancybox/dist/jquery.fancybox.min.css',
                JS: '@fancyapps/fancybox/dist/jquery.fancybox.min.js'
            },
            'remodal': {
                JS: 'remodal/dist/remodal.js'
            }
        },
        arr = [],
        i = 0;

    for (let prop in vendorArr) {
        arr[i] = '' + prop;
        i++;
    }

    // Vendor CSS
    let css = arr.map(function (arr) {
        let arrCSS = [];
        if (typeof vendorArr[arr].CSS === 'object') {
            vendorArr[arr].CSS.map(function (item, i) {
                arrCSS[i] = vendorDir + item;
            })
        } else {
            arrCSS[0] = vendorDir + vendorArr[arr].CSS;
        }

        return gulp.src(arrCSS ? arrCSS : [], {allowEmpty: true})
            .pipe(plugins.csso())
            .pipe(gulp.dest('../assets/vendor/' + arr + '/css'));
    });

    // Vendor JS
    let js = arr.map(function (arr) {
        let arrJS = [];
        if (typeof vendorArr[arr].JS === 'object') {
            vendorArr[arr].JS.map(function (item, i) {
                arrJS[i] = vendorDir + item;
            })
        } else {
            arrJS[0] = vendorDir + vendorArr[arr].JS;
        }

        let min = arr === 'remodal';

        return gulp.src(arrJS ? arrJS : [], {allowEmpty: true})
            .pipe(plugins.if(min, plugins.concat(arr + '.min.js')))
            .pipe(plugins.babel())
            .pipe(plugins.terser())
            .pipe(gulp.dest('../assets/vendor/' + arr + '/js'));
    });

    return function () {
        return plugins.merge(css, js);
    };
};
