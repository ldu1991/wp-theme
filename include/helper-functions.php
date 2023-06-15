<?php

/**
 * @param string $general_class
 * @param array $block
 * @param bool $is_preview
 * @return array
 */
function get_section_options(string $general_class = '', array $block = array(), bool $is_preview = false): array
{

    $result = array();

    if (!empty($block['anchor']) || !empty($block['id'])) {
        $result['id'] = !empty($block['anchor']) ? $block['anchor'] : $general_class . '-' . $block['id'];
    }

    $result['class'] = array();
    $result['class'][] = $general_class;

    if (!empty($block['className'])) $result['class'][] = $block['className'];

    if (!empty($block['align'])) $result['class'][] = 'align-' . $block['align'];

    if (!empty($is_preview)) $result['class'][] = $general_class . '_is-preview';

    $result['class'][] = B_PREFIX . '-section-element';

    return $result;
}

/**
 * @param array $block
 * @param string $src
 * @return bool
 */
function has_preview_screenshot(array $block = array(), string $src = ''): bool
{
    $screenshot = get_field('screenshot');
    $filename = pathinfo($block['render_template'])['filename'];
    $screenshot_src = !empty($src) ? $src : '/assets/img/screenshots/' . $filename . '.jpg';

    if (!empty($screenshot) && file_exists(B_TEMP_PATH . $screenshot_src)) {
        echo '<img width="100%" height="100%" src="' . B_TEMP_URL . $screenshot_src . '" alt="' . $filename . '">';

        return true;
    }

    return false;
}

/**
 * @param $link_arr
 * @param array $class
 * @param string $teg
 * @param array $atts
 * @param bool $return
 * @return string|void
 */
function the_btn($link_arr, array $class = array(), string $teg = 'a', array $atts = array(), bool $return = false)
{
    $class_link = ['fl-btn'];
    $class_link = array_merge($class_link, $class);

    if (!empty($link_arr)) {
        $html = '';
        $atts['class'] = esc_attr(trim(implode(' ', $class_link), " "));
        $atts['href'] = (!empty($link_arr['url']) && $teg === 'a') ? esc_url($link_arr['url']) : '';
        $atts['target'] = (!empty($link_arr['target']) && $link_arr['target'] === '_blank') ? '_blank' : '';

        $attributes = '';
        foreach ($atts as $attr => $value) {
            if (is_scalar($value) && '' !== $value && false !== $value) {
                $value = ('href' === $attr) ? esc_url($value) : esc_attr($value);
                $attributes .= ' ' . $attr . '="' . $value . '"';
            }
        }

        $html .= '<' . $teg . $attributes . '>';
        $html .= !empty($link_arr['title']) ? esc_html($link_arr['title']) : '';
        $html .= '</' . $teg . '>';

        if (!$return) {
            echo $html;
        } else {
            return $html;
        }
    }
}
