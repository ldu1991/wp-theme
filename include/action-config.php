<?php

// Do not allow directly accessing this file.
if (!defined('ABSPATH')) {
    exit('Direct script access denied.');
}

/* Action */
add_action('wp_enqueue_scripts', 'set_styles_scripts');
add_action('after_setup_theme', 'add_theme_supports');
add_action('acf/init', 'theme_acf_init');


/* Filter */
//add_filter('acf/settings/show_admin', '__return_false'); // Hide ACF field group menu item
//add_filter('use_block_editor_for_post', '__return_false', 5);
add_filter('big_image_size_threshold', '__return_false');
add_filter('woocommerce_enqueue_styles', '__return_empty_array');
//add_filter('wpcf7_autop_or_not', '__return_false');
//add_filter('wpcf7_load_css', '__return_false');


/**
 * Connection styles/scripts
 */
function set_styles_scripts()
{
    /* *** STYLES *** */
    wp_enqueue_style(B_PREFIX . '-style', B_STYLE_URL . '/assets/css/style.css', array());

    /* *** SCRIPTS *** */
    wp_enqueue_script(B_PREFIX . '-fullpage', B_TEMP_URL . '/assets/js/fullpage.js', array('jquery'), wp_get_theme()->get('Version'), true);
    wp_enqueue_script(B_PREFIX . '-script', B_TEMP_URL . '/assets/js/script.js', array('jquery'), wp_get_theme()->get('Version'), true);
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

    add_editor_style(array(
        'assets/css/style-editor.css'
    ));

    add_theme_support('wp-block-styles');
}


/**
 * ACF Init
 */
function theme_acf_init()
{
    if (function_exists('acf_add_options_page')) {
        $option_page = acf_add_options_page(array(
            'page_title' => __('Theme general settings', B_PREFIX),
            'menu_title' => __('Theme settings', B_PREFIX),
            'menu_slug' => 'theme-general-settings',
            'position' => 1.1
        ));
    }
}
