<?php

// Do not allow directly accessing this file.
if (!defined('ABSPATH')) {
    exit('Direct script access denied.');
}

add_action( 'enqueue_block_editor_assets', 'set_styles_scripts_block_editor' );

/* Action */
add_action('acf/init', 'beyond_register_acf_block_types');

/* Filter */
add_filter('block_categories_all', 'beyond_block_category', 10, 2);

function set_styles_scripts_block_editor() {
    wp_enqueue_script(B_PREFIX . '-script-block-editor', B_TEMP_URL . '/assets/js/script.js', array('jquery'), wp_get_theme()->get( 'Version' ), true);
}


/**
 * @param $categories
 * @param $post
 * @return array
 */
function beyond_block_category($categories, $post): array
{
    return array_merge(
        array(
            array(
                'slug'  => 'beyond-category',
                'title' => __('Beyond Blocks', B_PREFIX)
            )
        ),
        $categories
    );
}


/**
 * Data list files
 *
 * @return array
 */
function beyond_data_list_files(): array
{
    $files = array(
        'spacer' => array(
            'attributes' => array(
                'mode' => 'preview',
                'data' => array(
                    'min_value' => '50',
                    'max_value' => '80'
                )
            )
        )
    );
    $data_list = array();

    foreach ($files as $file => $file_data) {
        $data = get_file_data(B_TEMP_PATH . '/template-parts/blocks/' . $file . '.php', array(
            'title'         => 'Block Name',
            'slug'          => 'Slug',
            'description'   => 'Description',
            'keywords'      => 'Keywords',
            'align'         => 'Align',
            'screenshot'    => 'Screenshot'
        ));

        if (!empty($file_data)) {
            $data['example'] = $file_data;
        }

        $data['name'] = !empty($data['slug']) ? sanitize_title($data['slug']) : sanitize_title($data['title']);
        $data['file_uri'] = B_TEMP_PATH . '/template-parts/blocks/' . $file . '.php';

        $data_list[$file] = $data;
    }

    return $data_list;
}


/**
 * Register ACF block types
 */
function beyond_register_acf_block_types()
{
    foreach (beyond_data_list_files() as $block_data) {
        if (function_exists('acf_register_block_type')) {
            if($block_data['align'] === 'false' || $block_data['align'] === 0) {
                $align = false;
            } elseif ($block_data['align'] === 'true' || $block_data['align'] === 1) {
                $align = true;
            } else {
                $align = explode(', ', $block_data['align']);
            }

            if($block_data['screenshot'] !== 'false') {
                if ($block_data['screenshot'] === 'true') {
                    $block_data['example']['attributes']['data']['screenshot'] = $block_data['name'];
                } else {
                    $block_data['example']['attributes']['data']['screenshot'] = $block_data['screenshot'];
                }
            }

            acf_register_block_type(array(
                'name'              => $block_data['name'],
                'title'             => __($block_data['title']),
                'description'       => __($block_data['description']),
                'category'          => 'beyond-category',
                'icon'              => '<svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="90" height="90" fill="#DA0F26"/><path d="M70 60.1956C70 71.8261 62.8261 81.5 47.0652 81.5H20V39.5435H44.0217C54.2391 39.5435 57.8261 34.3261 57.8261 28.0217C57.8261 21.7174 55 16.5 44.7826 16.5L20 16.6087V9H45.2174C59.6739 9 65.8696 17.4783 65.8696 27.913C65.8696 33.7826 63.0435 39 58.2609 42.1522C65.7609 45.7391 70 52.2609 70 60.1956ZM61.9565 60.1956C61.9565 52.6956 57.1739 46.2826 46.413 46.2826H27.6087V73.8913L46.8478 74C57.0652 74.1087 61.9565 67.6956 61.9565 60.1956Z" fill="white"/></svg>',
                'keywords'          => explode(', ', $block_data['keywords']),
                'render_template'   => $block_data['file_uri'],
                'align'             => 'full',
                'supports'          => array(
                    'align'     => $align,
                    'anchor'    => true,
                    'mode'      => true,
                    'multiple'  => true,
                    'jsx'       => true
                ),
                'example'           => $block_data['example']
            ));
        }
    }
}
