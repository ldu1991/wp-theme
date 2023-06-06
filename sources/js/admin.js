acf.add_filter('color_picker_args', function (args, field) {
    args.palettes = wp_ajax.color_palettes

    return args;
})

