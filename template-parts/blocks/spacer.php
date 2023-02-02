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

$block_name = 'wp-custom-spacer';

// Create id attribute allowing for custom "anchor" value.
$id = !empty($block['anchor']) ? $block['anchor'] : $block_name . '-' . $block['id'];

// Create class attribute allowing for custom "className" and "align" values.
$className = array();

$className[] = $block_name;

if (!empty($block['className'])) $className[] = $block['className'];

if (!empty($block['align'])) $className[] = 'align-' . $block['align'];

if (!empty($is_preview)) $className[] = $block_name . '_is-preview';

$className[] = B_PREFIX . '-section-element';

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

<div id="<?php echo esc_attr($id); ?>"
     class="<?php echo esc_attr(trim(implode(' ', $className))) ?>"
     style="<?php echo 'height: clamp(' . ($min_value / $browser_context) . 'rem, ' . $val . ', ' . ($max_value / $browser_context) . 'rem)'; ?>"></div>
