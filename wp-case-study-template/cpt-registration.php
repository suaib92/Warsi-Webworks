<?php
/**
 * Plugin Name: Custom Post Type - Case Studies
 * Description: Registers the Case Studies CPT for the website.
 * Version: 1.0
 * Author: AntiGravity
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function register_case_studies_cpt() {
    $labels = array(
        'name'                  => _x( 'Case Studies', 'Post type general name', 'textdomain' ),
        'singular_name'         => _x( 'Case Study', 'Post type singular name', 'textdomain' ),
        'menu_name'             => _x( 'Case Studies', 'Admin Menu text', 'textdomain' ),
        'name_admin_bar'        => _x( 'Case Study', 'Add New on Toolbar', 'textdomain' ),
        'add_new'               => __( 'Add New', 'textdomain' ),
        'add_new_item'          => __( 'Add New Case Study', 'textdomain' ),
        'new_item'              => __( 'New Case Study', 'textdomain' ),
        'edit_item'             => __( 'Edit Case Study', 'textdomain' ),
        'view_item'             => __( 'View Case Study', 'textdomain' ),
        'all_items'             => __( 'All Case Studies', 'textdomain' ),
        'search_items'          => __( 'Search Case Studies', 'textdomain' ),
        'parent_item_colon'     => __( 'Parent Case Studies:', 'textdomain' ),
        'not_found'             => __( 'No case studies found.', 'textdomain' ),
        'not_found_in_trash'    => __( 'No case studies found in Trash.', 'textdomain' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'case-studies' ), // Matches URL requirement
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 5,
        'menu_icon'          => 'dashicons-portfolio',
        'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions' ),
        'show_in_rest'       => true, // Essential for Elementor/Gutenberg
    );

    register_post_type( 'case_study', $args );
}
add_action( 'init', 'register_case_studies_cpt' );
