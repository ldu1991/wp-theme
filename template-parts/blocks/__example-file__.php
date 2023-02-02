<?php

/*
 * Block Name: __example__
 * Slug:
 * Description:
 * Keywords:
 * Align: wide, full
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$block_name = '__class-block__';

// Create id attribute allowing for custom "anchor" value.
$id = !empty($block['anchor']) ? $block['anchor'] : $block_name . '-' . $block['id'];

// Create class attribute allowing for custom "className" and "align" values.
$className = array();

$className[] = $block_name;

if (!empty($block['className'])) $className[] = $block['className'];

if (!empty($block['align'])) $className[] = 'align-' . $block['align'];

if (!empty($is_preview)) $className[] = $block_name . '_is-preview';

$className[] = B_PREFIX . '-section-element';

$filed = get_field('filed');
?>

<div id="<?php echo esc_attr($id); ?>"
     class="<?php echo esc_attr(trim(implode(' ', $className))) ?>">


</div>
