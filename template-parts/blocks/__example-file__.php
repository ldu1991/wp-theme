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

$general_class = '__class_block__';
$attr = get_section_options($general_class, $block, $is_preview);
if (has_preview_screenshot($block, '')) return;

$filed = get_field('filed');
?>

<section id="<?php echo esc_attr($attr['id']); ?>"
         class="<?php echo esc_attr(trim(implode(' ', $attr['class']))) ?>">


</section>
