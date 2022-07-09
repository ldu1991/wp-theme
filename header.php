<?php

// Do not allow directly accessing this file.
if (!defined('ABSPATH')) {
    exit('Direct script access denied.');
}

?><!DOCTYPE HTML>
<html <?php language_attributes(); ?>>

<head>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta charset="<?php bloginfo('charset') ?>">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>


<?php
$field = get_field('fr', 'option');
beyond_generate_adaptive_numeric('.rtttttttttt', 'width', 'fr', 'option')
?>
<header>

    <div class="logo">

    </div>

    <nav class="nav-search">

    </nav>

    <?php get_search_form(); ?>

</header>
