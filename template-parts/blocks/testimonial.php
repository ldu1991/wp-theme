<?php

/*
 * Block Name: Testimonials block ACF
 * Slug:
 * Description: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, velit.
 * Keywords: testimonials, fancybox, remodal, swiper
 * Align: true
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

$block_name = 'by-testimonial';

// Create id attribute allowing for custom "anchor" value.
$id = $block_name . '-' . $block['id'];
if (!empty($block['anchor'])) {
    $id = $block['anchor'];
}

// Create class attribute allowing for custom "className" and "align" values.
$className = array();

$className[] = $block_name;
if (!empty($block['className'])) {
    $className[] = $block['className'];
}
if (!empty($block['align'])) {
    $className[] = 'align-' . $block['align'];
}
if (!empty($is_preview)) {
    $className[] = $block_name . '_is-preview';
}

$clor = get_field('clor');
?>

<div id="<?php echo esc_attr($id); ?>"
     class="<?php echo esc_attr(implode(' ', $className)) ?>"
     style="background-color: <?php echo $clor ?>">


</div>

<?php get_template_part('template-parts/elements/testim'); ?>
