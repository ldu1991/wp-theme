<?php

/*
 * Block Name: __example__
 * Slug:
 * Description:
 * Keywords:
 * Align: wide, full
 * Screenshot: true
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$general_class = '__class_block__';
$atts = [];

$filed = get_field('filed');

the_section_block_start($general_class, $atts, $block, $is_preview); ?>



<?php the_section_block_end();
