<?php

// Do not allow directly accessing this file.
if (!defined('ABSPATH')) {
    exit('Direct script access denied.');
}

/* Action */
add_action('admin_enqueue_scripts', 'set_admin_styles_scripts');
add_action('wp_enqueue_scripts', 'set_styles_scripts');
add_action('after_setup_theme', 'add_theme_supports');
add_action('acf/init', 'theme_acf_init');


/* Filter */
//add_filter('acf/settings/show_admin', '__return_false'); // Hide ACF field group menu item
//add_filter('use_block_editor_for_post', '__return_false', 5);
add_filter('big_image_size_threshold', '__return_false');
add_filter('woocommerce_enqueue_styles', '__return_empty_array');


/**
 * Connection admin styles/scripts
 */
function set_admin_styles_scripts()
{
    $theme_json = WP_Theme_JSON_Resolver::get_merged_data()->get_settings();
    $color_palettes = '';
    foreach ($theme_json['color']['palette']['theme'] as $color) {
        $color_palettes .= '"' . $color['color'] . '",';
    }

    wp_add_inline_script('acf-input', "acf.add_filter('color_picker_args', function (args, field) {args.palettes = [" . trim($color_palettes, ',') . "]; return args;})");
}


/**
 * Connection styles/scripts
 */
function set_styles_scripts()
{
    /* *** STYLES *** */
    if (!empty(get_google_fonts())) wp_enqueue_style(B_PREFIX . '-fonts', get_google_fonts(), array(), null);
    wp_enqueue_style(B_PREFIX . '-style', B_STYLE_URL . '/assets/css/style.css', array());

    /* *** SCRIPTS *** */
    wp_enqueue_script(B_PREFIX . '-script', B_TEMP_URL . '/assets/js/script.js', array('jquery'), wp_get_theme()->get('Version'), true);

    /* *** LOCAL SCRIPTS *** */
    wp_localize_script(B_PREFIX . '-script', 'wp_ajax',
        array(
            'url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('wpajax-noncecode'),
            'url_theme' => B_TEMP_URL,
            'prefix' => B_PREFIX
        )
    );
}


/**
 * Register supports
 */
function add_theme_supports()
{
    // Localisation Support
    load_theme_textdomain('html5blank', B_TEMP_PATH . '/languages');

    // Let WordPress manage the document title.
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails on posts and pages.
    add_theme_support('post-thumbnails');

    // Switch default core markup for search form, comment form, and comments to output valid HTML5.
    add_theme_support('html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
    ));

    // Post formats
    add_theme_support('post-formats', array(
        'aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'chat', 'audio'
    ));

    add_theme_support('woocommerce');

    // Register navigation menus.
    register_nav_menus(array(
        'header_menu' => __('Menu', 'ld'),
    ));

    // Add image sizes.
    add_image_size('thumbnail-once', 200, 200, true);

    // Editor styles.
    add_theme_support('editor-styles');

    $editor_style = ['assets/css/style-editor.css'];
    if (!empty(get_google_fonts())) $editor_style[] = get_google_fonts();
    add_editor_style($editor_style);
}


/**
 * ACF Init
 */
function theme_acf_init()
{
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page(array(
            'page_title' => __('Theme general settings', B_PREFIX),
            'menu_title' => __('Theme settings', B_PREFIX),
            'menu_slug' => 'theme-general-settings',
            'position' => 1.1
        ));
    }
}

/**
 * @param $init
 * @return mixed
 */
function color_palettes_tiny_mce($init)
{
    $theme_json = WP_Theme_JSON_Resolver::get_merged_data()->get_settings();
    $color_palettes = '';
    foreach ($theme_json['color']['palette']['theme'] as $color) {
        $color_palettes .= '"' . preg_replace("/#/", "", $color['color']) . '","' . $color['name'] . '",';
    }

    $init['textcolor_map'] = '[' . $color_palettes . ']';

    $init['textcolor_rows'] = ceil(count($theme_json['color']['palette']['theme']) / 8);

    return $init;
}

add_filter('tiny_mce_before_init', 'color_palettes_tiny_mce');


/**
 * @return string|null
 */
function get_google_fonts()
{

    $global_styles = WP_Theme_JSON_Resolver::get_merged_data()->get_settings();

    if (empty($global_styles['typography']['fontFamilies'])) {
        return '';
    }

    $theme_fonts = !empty($global_styles['typography']['fontFamilies']['theme']) ? $global_styles['typography']['fontFamilies']['theme'] : array();

    if (!$theme_fonts) {
        return '';
    }

    $font_vars = array();

    foreach ($theme_fonts as $font) {
        if (!empty($font['google'])) {
            $font_vars[] = $font['google'];
        }
    }

    if (!$font_vars) {
        return '';
    }

    return esc_url_raw('https://fonts.googleapis.com/css2?' . implode('&', $font_vars) . '&display=swap');

}
