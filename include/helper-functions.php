<?php

function main_class($css_class = '')
{
    $classes = array();
    $classes[] = B_PREFIX . '-main-wrapper';

    if (!empty($css_class)) {
        if (!is_array($css_class)) {
            $css_class = preg_split('#\s+#', $css_class);
        }
        $classes = array_merge($classes, $css_class);
    }

    echo 'class="' . trim(implode(' ', $classes)) . '"';
}

/**
 * @param string $general_class
 * @param array $atts
 * @param array $block
 * @param bool $is_preview
 */
function the_section_block_start(string $general_class = '', array $atts = array(), array $block = array(), bool $is_preview = false) {

    if(!empty($block['anchor']) || !empty($block['id'])) {
        $atts['id'] = !empty($block['anchor']) ? $block['anchor'] : $general_class . '-' . $block['id'];
    }

    $atts['class'][] = $general_class;
    $atts['class'][] = B_PREFIX . '-section-element';

    if (!empty($block['className'])) $atts['class'][] = $block['className'];

    if (!empty($block['align'])) $atts['class'][] = 'align-' . $block['align'];

    if (!empty($is_preview)) $atts['class'][] = $general_class . '_is-preview';

    $attributes_section = '';
    foreach ($atts as $attr => $value) {
        if ('' !== $value && false !== $value) {
            $value = ('class' === $attr) ? esc_attr(trim(implode(' ', $value))) : esc_attr($value);
            $attributes_section .= ' ' . $attr . '="' . $value . '"';
        }
    }

    // Preview
    $screenshot = get_field('screenshot');
    $screenshot_src = '/assets/img/screenshots/' . $screenshot . '.png';

    if(!empty($screenshot) && file_exists(B_TEMP_PATH . $screenshot_src)) {
        echo '<img width="100%" height="100%" src="' . B_TEMP_URL . $screenshot_src . '" alt="' . $screenshot . '">';

        return;
    }

    echo '<section' . $attributes_section . '>';
}

function the_section_block_end() {
    echo '</section>';
}

/**
 * @param $link_arr
 * @param string $class
 * @param string $teg
 * @param array $atts
 * @param bool $return
 * @return string|void
 */
function the_btn($link_arr, string $class = '', string $teg = 'a', array $atts = array(), bool $return = false)
{
    $class_link = ['fl-btn'];
    $class_link[] = $class;

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
