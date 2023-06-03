<?php

// Do not allow directly accessing this file.
if (!defined('ABSPATH')) {
  exit('Direct script access denied.');
}

/**
 * Project prefix
 */
$prefix = 'beyond';

/**
 * Define constants.
 */
if (!defined('B_PREFIX')) define('B_PREFIX', $prefix);
if (!defined('B_TEMP_PATH')) define('B_TEMP_PATH', get_template_directory());
if (!defined('B_TEMP_URL')) define('B_TEMP_URL', get_template_directory_uri());
if (!defined('B_STYLE_PATH')) define('B_STYLE_PATH', get_stylesheet_directory());
if (!defined('B_STYLE_URL')) define('B_STYLE_URL', get_stylesheet_directory_uri());


/**
 * Include
 */
include_once('include/helper-functions.php');
include_once('include/init-gutenberg-blocks.php');
include_once('include/action-config.php');
