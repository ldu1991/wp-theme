<?php

/*
 * Block Name: Spacer
 * Slug:
 * Description:
 * Keywords: spacer
 * Align: full
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$general_class = 'wp-custom-spacer';
$attr = get_section_options($general_class, $block, $is_preview);

$min_value = (float)get_field('min_value');
$max_value = (float)get_field('max_value');

$browser_context = 16;
$screen_width = 1440;

$index_screen = ($screen_width * 0.01) / $browser_context;

$val = 0;
if ($min_value < 0) {
    $val = ($min_value / $browser_context) / $index_screen . 'vw';
} else {
    $val = ($max_value / $browser_context) / $index_screen . 'vw';
} ?>

<section id="<?php echo esc_attr($attr['id']); ?>"
         class="<?php echo esc_attr(trim(implode(' ', $attr['class']))) ?>"
         style="<?php echo 'height: clamp(' . ($min_value / $browser_context) . 'rem, ' . $val . ', ' . ($max_value / $browser_context) . 'rem)'; ?>"></section>
