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

<form id="filter">
    <label>
        <input type="radio" name="date" value="ASC"/> Date: Ascending
    </label>
    <br>
    <label>
        <input type="radio" name="date" value="DESC"/> Date: Descending
    </label>
    <br>


    <label>1 <input type="checkbox" name="rooms" value="1"/></label>
    <label>2 <input type="checkbox" name="rooms" value="2"/></label>
    <label>3 <input type="checkbox" name="rooms" value="3"/></label>
    <label>4 <input type="checkbox" name="rooms" value="4"/></label>

    <input type="submit" value="submit">
</form>
