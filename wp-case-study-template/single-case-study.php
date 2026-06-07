<?php
/**
 * Template Name: Single Case Study
 * Template Post Type: case_study
 * 
 * Single post template for Case Studies, designed to work with Elementor 
 * and Advanced Custom Fields.
 */

get_header();

// Enqueue specific styles and scripts for the Case Study template
wp_enqueue_style( 'case-study-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', false );
wp_enqueue_style( 'case-study-styles', get_template_directory_uri() . '/wp-case-study-template/case-study-styles.css', array(), '1.0.0' );
wp_enqueue_script( 'case-study-scripts', get_template_directory_uri() . '/wp-case-study-template/case-study-scripts.js', array(), '1.0.0', true );

// Retrieve ACF Fields
$hero_badge = get_field('hero_badge');
$hero_title = get_field('hero_title') ?: get_the_title();
$hero_description = get_field('hero_description');
$hero_image = get_field('hero_image');
$primary_cta_text = get_field('primary_cta_text');
$primary_cta_link = get_field('primary_cta_link');
$secondary_cta_text = get_field('secondary_cta_text');
$secondary_cta_link = get_field('secondary_cta_link');

// Candidate Info
$candidate_image = get_field('candidate_image');
$candidate_position = get_field('candidate_position');
$candidate_description = get_field('candidate_description');
$specialty = get_field('specialty');
$target_country = get_field('target_country');
$license_applied = get_field('license_applied');
$experience = get_field('experience');

// Testimonial
$testimonial_title = get_field('testimonial_title');
$testimonial_description = get_field('testimonial_description');
$testimonial_quote = get_field('testimonial_quote');
$doctor_name = get_field('doctor_name');
$doctor_credentials = get_field('doctor_credentials');

// Final CTA
$cta_heading = get_field('cta_heading');
$cta_description = get_field('cta_description');
$cta_primary_btn = get_field('cta_primary_button');
$cta_secondary_btn = get_field('cta_secondary_button');

?>

<main id="primary" class="site-main case-study-main">
    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        
        <!-- SEO Schema Markup -->
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          "name": "<?php echo esc_js($hero_title); ?>",
          "description": "<?php echo esc_js(wp_strip_all_tags($hero_description)); ?>",
          "url": "<?php the_permalink(); ?>",
          "publisher": {
            "@type": "Organization",
            "name": "<?php bloginfo('name'); ?>"
          }
        }
        </script>

        <!-- SECTION 1: HERO -->
        <section class="cs-section cs-hero">
            <div class="cs-container">
                <div class="cs-hero-grid">
                    <div class="cs-hero-content">
                        <?php if ($hero_badge): ?>
                            <span class="cs-eyebrow"><?php echo esc_html($hero_badge); ?></span>
                        <?php endif; ?>
                        
                        <h1 class="cs-heading-hero"><?php echo esc_html($hero_title); ?></h1>
                        
                        <?php if ($hero_description): ?>
                            <p class="cs-description-hero"><?php echo esc_html($hero_description); ?></p>
                        <?php endif; ?>
                        
                        <div class="cs-hero-actions">
                            <?php if ($primary_cta_text && $primary_cta_link): ?>
                                <a href="<?php echo esc_url($primary_cta_link); ?>" class="cs-btn cs-btn-primary"><?php echo esc_html($primary_cta_text); ?></a>
                            <?php endif; ?>
                            <?php if ($secondary_cta_text && $secondary_cta_link): ?>
                                <a href="<?php echo esc_url($secondary_cta_link); ?>" class="cs-btn cs-btn-secondary"><?php echo esc_html($secondary_cta_text); ?></a>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <div class="cs-hero-stats">
                        <div class="cs-stats-grid">
                            <?php for ($i = 1; $i <= 4; $i++): 
                                $stat_num = get_field('stat_' . $i . '_number');
                                $stat_label = get_field('stat_' . $i . '_label');
                                if ($stat_num && $stat_label):
                            ?>
                                <div class="cs-stat-card glass-card">
                                    <span class="cs-stat-num"><?php echo esc_html($stat_num); ?></span>
                                    <span class="cs-stat-label"><?php echo esc_html($stat_label); ?></span>
                                </div>
                            <?php endif; endfor; ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 2: CANDIDATE OVERVIEW -->
        <section class="cs-section cs-overview bg-light">
            <div class="cs-container">
                <div class="cs-overview-grid">
                    <div class="cs-overview-image">
                        <?php if ($candidate_image): ?>
                            <img src="<?php echo esc_url($candidate_image['url']); ?>" alt="<?php echo esc_attr($candidate_image['alt']); ?>" class="cs-rounded-image">
                        <?php endif; ?>
                    </div>
                    <div class="cs-overview-info">
                        <h2 class="cs-heading-section"><?php echo esc_html($candidate_position ?: 'Candidate Overview'); ?></h2>
                        <?php if ($candidate_description): ?>
                            <p class="cs-text-body"><?php echo esc_html($candidate_description); ?></p>
                        <?php endif; ?>
                        
                        <div class="cs-info-cards">
                            <?php if($specialty): ?>
                            <div class="cs-info-card">
                                <strong>Specialty</strong>
                                <span><?php echo esc_html($specialty); ?></span>
                            </div>
                            <?php endif; ?>
                            <?php if($target_country): ?>
                            <div class="cs-info-card">
                                <strong>Target Country</strong>
                                <span><?php echo esc_html($target_country); ?></span>
                            </div>
                            <?php endif; ?>
                            <?php if($license_applied): ?>
                            <div class="cs-info-card">
                                <strong>License Applied</strong>
                                <span><?php echo esc_html($license_applied); ?></span>
                            </div>
                            <?php endif; ?>
                            <?php if($experience): ?>
                            <div class="cs-info-card">
                                <strong>Experience</strong>
                                <span><?php echo esc_html($experience); ?></span>
                            </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 3: CHALLENGES & SOLUTIONS -->
        <section class="cs-section cs-challenges-solutions">
            <div class="cs-container">
                <div class="cs-two-col">
                    <div class="cs-col cs-challenges">
                        <h3 class="cs-heading-card">Candidate Challenges</h3>
                        <?php if (have_rows('challenges')): ?>
                            <ul class="cs-feature-list cs-danger-list">
                            <?php while (have_rows('challenges')): the_row(); ?>
                                <li>
                                    <span class="cs-icon cs-icon-danger">✕</span>
                                    <?php echo esc_html(get_sub_field('challenge_title')); ?>
                                </li>
                            <?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                    <div class="cs-col cs-solutions">
                        <h3 class="cs-heading-card">How We Helped</h3>
                        <?php if (have_rows('solutions')): ?>
                            <ul class="cs-feature-list cs-success-list">
                            <?php while (have_rows('solutions')): the_row(); ?>
                                <li>
                                    <span class="cs-icon cs-icon-success">✓</span>
                                    <?php echo esc_html(get_sub_field('solution_title')); ?>
                                </li>
                            <?php endwhile; ?>
                            </ul>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 4: RESULTS & OUTCOMES -->
        <section class="cs-section cs-results bg-light">
            <div class="cs-container">
                <h2 class="cs-heading-section text-center">Results & Outcomes</h2>
                <div class="cs-results-grid">
                    <?php for ($i = 1; $i <= 4; $i++): 
                        $res_num = get_field('result_' . $i . '_number');
                        $res_label = get_field('result_' . $i . '_label');
                        if ($res_num && $res_label):
                            // Strip non-numeric for data attribute if we want to animate it
                            $num_only = preg_replace('/[^0-9]/', '', $res_num);
                            $prefix_suffix = preg_replace('/[0-9]/', '', $res_num);
                    ?>
                        <div class="cs-result-card">
                            <h3 class="cs-result-num" data-target="<?php echo esc_attr($num_only); ?>" data-format="<?php echo esc_attr($prefix_suffix); ?>">
                                <?php echo esc_html($res_num); ?>
                            </h3>
                            <p class="cs-result-label"><?php echo esc_html($res_label); ?></p>
                        </div>
                    <?php endif; endfor; ?>
                </div>
            </div>
        </section>

        <!-- SECTION 5: DOCTOR TESTIMONIAL -->
        <section class="cs-section cs-testimonial">
            <div class="cs-container">
                <div class="cs-testimonial-grid">
                    <div class="cs-testimonial-content">
                        <h2 class="cs-heading-section"><?php echo esc_html($testimonial_title ?: 'Success Story'); ?></h2>
                        <?php if ($testimonial_description): ?>
                            <p class="cs-text-body"><?php echo esc_html($testimonial_description); ?></p>
                        <?php endif; ?>
                    </div>
                    <div class="cs-testimonial-card-wrapper">
                        <div class="cs-testimonial-card premium-card">
                            <span class="cs-quote-mark">"</span>
                            <p class="cs-quote-text"><?php echo esc_html($testimonial_quote); ?></p>
                            <div class="cs-quote-author">
                                <strong><?php echo esc_html($doctor_name); ?></strong>
                                <span><?php echo esc_html($doctor_credentials); ?></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- SECTION 6: RELATED CASE STUDIES -->
        <section class="cs-section cs-related bg-light">
            <div class="cs-container">
                <h2 class="cs-heading-section">Related Case Studies</h2>
                <div class="cs-related-grid">
                    <?php
                    $related_args = array(
                        'post_type'      => 'case_study',
                        'posts_per_page' => 3,
                        'post__not_in'   => array(get_the_ID()),
                        'orderby'        => 'date',
                        'order'          => 'DESC'
                    );
                    $related_query = new WP_Query($related_args);
                    if ($related_query->have_posts()):
                        while ($related_query->have_posts()): $related_query->the_post();
                    ?>
                        <a href="<?php the_permalink(); ?>" class="cs-related-card">
                            <div class="cs-related-img">
                                <?php if (has_post_thumbnail()) {
                                    the_post_thumbnail('medium_large');
                                } else {
                                    echo '<div class="cs-placeholder-img"></div>';
                                } ?>
                            </div>
                            <div class="cs-related-content">
                                <h3 class="cs-card-heading"><?php the_title(); ?></h3>
                                <p class="cs-text-small"><?php echo wp_trim_words(get_the_excerpt(), 15); ?></p>
                                <span class="cs-read-more">Read More &rarr;</span>
                            </div>
                        </a>
                    <?php
                        endwhile;
                        wp_reset_postdata();
                    endif;
                    ?>
                </div>
            </div>
        </section>

        <!-- SECTION 7: FINAL CTA -->
        <section class="cs-section cs-final-cta">
            <div class="cs-container text-center">
                <h2 class="cs-heading-hero text-white"><?php echo esc_html($cta_heading); ?></h2>
                <?php if ($cta_description): ?>
                    <p class="cs-description-hero text-white-70"><?php echo esc_html($cta_description); ?></p>
                <?php endif; ?>
                <div class="cs-hero-actions justify-center">
                    <?php if ($cta_primary_btn): ?>
                        <a href="<?php echo esc_url($cta_primary_btn['url']); ?>" class="cs-btn cs-btn-primary cs-btn-large"><?php echo esc_html($cta_primary_btn['title']); ?></a>
                    <?php endif; ?>
                    <?php if ($cta_secondary_btn): ?>
                        <a href="<?php echo esc_url($cta_secondary_btn['url']); ?>" class="cs-btn cs-btn-outline-white cs-btn-large"><?php echo esc_html($cta_secondary_btn['title']); ?></a>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <!-- Elementor Fallback Content -->
        <?php if( did_action( 'elementor/loaded' ) ) : ?>
            <div class="cs-elementor-content">
                <?php the_content(); ?>
            </div>
        <?php endif; ?>

    </article>
</main>

<?php
get_footer();
