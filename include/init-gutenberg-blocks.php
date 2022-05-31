<?php

// Do not allow directly accessing this file.
if (!defined('ABSPATH')) {
    exit('Direct script access denied.');
}

add_action( 'enqueue_block_editor_assets', 'set_styles_scripts_block_editor' );

/* Action */
add_action('acf/init', 'beyond_register_acf_block_types');

/* Filter */
add_filter('block_categories', 'beyond_block_category', 10, 2);

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
        $categories,
        array(
            array(
                'slug'  => 'beyond-category',
                'title' => __('Beyond Blocks', B_PREFIX)
            )
        )
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
        'testimonial' => array(
            'attributes' => array(
                'mode' => 'preview',
                'data' => array(
                    'is_preview' => true,
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
            'align'         => 'Align'
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
            acf_register_block_type(array(
                'name'              => $block_data['name'],
                'title'             => __($block_data['title']),
                'description'       => __($block_data['description']),
                'category'          => 'beyond-category',
                'icon'              => '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 90 90"><rect x="-0.2" y="0.2" fill="#DA0F26" width="90" height="90"/><path fill="#FFFFFF" d="M68.6,57.8c0,10.7-6.6,19.6-21.1,19.6H22.6V38.8h22.1c9.4,0,12.7-4.8,12.7-10.6c0-5.8-2.6-10.6-12-10.6l-22.8,0.1v-7h23.2c13.3,0,19,7.8,19,17.4c0,5.4-2.6,10.2-7,13.1C64.7,44.5,68.6,50.5,68.6,57.8z M61.2,57.8c0-6.9-4.4-12.8-14.3-12.8H29.6v25.4l17.7,0.1C56.7,70.6,61.2,64.7,61.2,57.8z"/></svg>',
                'keywords'          => explode(', ', $block_data['keywords']),
                'render_template'   => $block_data['file_uri'],
                'supports'          => array(
                    'align'     => !empty($block_data['align']),
                    'mode'      => true,
                    'multiple'  => true,
                    'jsx'       => true
                ),
                'example'           => $block_data['example']
            ));
        }
    }
}
