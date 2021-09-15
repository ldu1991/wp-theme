<?php

// Do not allow directly accessing this file.
if ( ! defined( 'ABSPATH' ) ) {
	exit( 'Direct script access denied.' );
}

// Register Custom Post Type
function custom_post_portfolio() {

	$labels = array(
		'name'                => _x( 'Портфолио', 'Post Type General Name', B_PREFIX ),
		'singular_name'       => _x( 'Портфолио', 'Post Type Singular Name', B_PREFIX ),
		'menu_name'           => __( 'Портфолио', B_PREFIX ),
		'name_admin_bar'      => __( 'Портфолио', B_PREFIX ),
		'parent_item_colon'   => __( 'Источник записи:', B_PREFIX ),
		'all_items'           => __( 'Все материалы', B_PREFIX ),
		'add_new_item'        => __( 'Добавление записи', B_PREFIX ),
		'add_new'             => __( 'Добавить запись', B_PREFIX ),
		'new_item'            => __( 'Новая запись', B_PREFIX ),
		'edit_item'           => __( 'Редактирование записи', B_PREFIX ),
		'update_item'         => __( 'Обновление записи', B_PREFIX ),
		'view_item'           => __( 'Посмотреть проект', B_PREFIX ),
		'search_items'        => __( 'Поиск записи', B_PREFIX ),
		'not_found'           => __( 'Проекты не найдены', B_PREFIX ),
		'not_found_in_trash'  => __( 'Не найдено в корзине', B_PREFIX ),
	);
	$args = array(
		'label'               => __( 'post_portfolio', B_PREFIX ),
		'description'         => __( 'Портфолио', B_PREFIX ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'editor', 'post-formats', ),
    'taxonomies'          => array( 'post_tag' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 6,
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
        // 'menu_icon'           => plugins_url( 'images/image.png', __FILE__ ),
		'capability_type'     => 'post',
	);
	register_post_type( 'post_portfolio', $args );

}

// Hook into the 'init' action
add_action( 'init', 'custom_post_portfolio' );

// Register Custom Taxonomy
function custom_taxonomy_portfolio() {

	$labels = array(
		'name'                       => _x( 'Категории', 'Taxonomy General Name', B_PREFIX ),
		'singular_name'              => _x( 'Категория', 'Taxonomy Singular Name', B_PREFIX ),
		'menu_name'                  => __( 'Категории', B_PREFIX ),
		'all_items'                  => __( 'Все категории', B_PREFIX ),
		'parent_item'                => __( 'Родитель категории', B_PREFIX ),
		'parent_item_colon'          => __( 'Родитель категории:', B_PREFIX ),
		'new_item_name'              => __( 'Имя новой категории', B_PREFIX ),
		'add_new_item'               => __( 'Добавить категорию', B_PREFIX ),
		'edit_item'                  => __( 'Изменить категорию', B_PREFIX ),
		'update_item'                => __( 'Обновить категорию', B_PREFIX ),
		'view_item'                  => __( 'Посмотреть', B_PREFIX ),
		'separate_items_with_commas' => __( 'Отдельные категории запятыми', B_PREFIX ),
		'add_or_remove_items'        => __( 'Добавить или удалить категорию', B_PREFIX ),
		'choose_from_most_used'      => __( 'Выбрать из наиболее часто используемых', B_PREFIX ),
		'popular_items'              => __( 'Популярные', B_PREFIX ),
		'search_items'               => __( 'Поиск категории', B_PREFIX ),
		'not_found'                  => __( 'Не найдено', B_PREFIX ),
	);
	$args = array(
		'labels'                     => $labels,
		'hierarchical'               => true,
		'public'                     => true,
		'show_ui'                    => true,
		'show_admin_column'          => true,
		'show_in_nav_menus'          => true,
		'show_tagcloud'              => true,
	);
	register_taxonomy( 'taxonomy_portfolio', array( 'post_portfolio' ), $args );

}

// Hook into the 'init' action
add_action( 'init', 'custom_taxonomy_portfolio', 0 );
