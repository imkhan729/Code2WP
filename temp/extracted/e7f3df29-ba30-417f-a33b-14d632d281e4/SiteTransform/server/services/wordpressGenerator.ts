import * as cheerio from 'cheerio';
import JSZip from 'jszip';
import path from 'path';
import { ParsedWebsite } from './htmlParser';

export class WordPressGenerator {
  async generateTheme(parsedWebsite: ParsedWebsite, themeName: string): Promise<Buffer> {
    const zip = new JSZip();
    const themeFolder = zip.folder(themeName);
    
    if (!themeFolder) {
      throw new Error('Failed to create theme folder');
    }
    
    // Generate style.css with theme header
    const styleCSS = this.generateStyleCSS(parsedWebsite, themeName);
    themeFolder.file('style.css', styleCSS);
    
    // Generate PHP template files
    const { header, footer, index } = this.generatePHPTemplates(parsedWebsite);
    
    themeFolder.file('header.php', header);
    themeFolder.file('footer.php', footer);
    themeFolder.file('index.php', index);
    themeFolder.file('functions.php', this.generateFunctionsPhp());
    
    // Generate additional template files
    themeFolder.file('single.php', this.generateSinglePhp());
    themeFolder.file('page.php', this.generatePagePhp());
    themeFolder.file('404.php', this.generate404Php());
    
    // Add custom JavaScript if any
    if (parsedWebsite.js.length > 0) {
      const jsFolder = themeFolder.folder('js');
      if (jsFolder) {
        const combinedJS = parsedWebsite.js.join('\n\n');
        jsFolder.file('theme.js', combinedJS);
      }
    }
    
    return await zip.generateAsync({ type: 'nodebuffer' });
  }
  
  private generateStyleCSS(parsedWebsite: ParsedWebsite, themeName: string): string {
    const header = `/*
Theme Name: ${themeName}
Description: WordPress theme converted from HTML
Version: 1.0
Author: HTML to WordPress Converter
*/

`;
    
    const combinedCSS = parsedWebsite.css.join('\n\n');
    return header + combinedCSS;
  }
  
  private generatePHPTemplates(parsedWebsite: ParsedWebsite): { header: string, footer: string, index: string } {
    const $ = cheerio.load(parsedWebsite.html);
    
    // Extract head content for header.php
    const headContent = $('head').html() || '';
    const headerContent = this.extractHeaderContent($);
    const footerContent = this.extractFooterContent($);
    const mainContent = this.extractMainContent($);
    
    const header = `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${headContent}
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
${headerContent}
`;

    const footer = `${footerContent}
<?php wp_footer(); ?>
</body>
</html>`;

    const index = `<?php get_header(); ?>

${mainContent}

<?php get_footer(); ?>`;

    return { header, footer, index };
  }
  
  private extractHeaderContent($: cheerio.CheerioAPI): string {
    // Look for common header selectors
    const headerSelectors = ['header', '.header', '#header', 'nav', '.navbar', '.nav'];
    
    for (const selector of headerSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        return element.prop('outerHTML') || '';
      }
    }
    
    return '';
  }
  
  private extractFooterContent($: cheerio.CheerioAPI): string {
    // Look for common footer selectors
    const footerSelectors = ['footer', '.footer', '#footer'];
    
    for (const selector of footerSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        return element.prop('outerHTML') || '';
      }
    }
    
    return '';
  }
  
  private extractMainContent($: cheerio.CheerioAPI): string {
    // Remove header and footer from body content
    $('header, .header, #header, footer, .footer, #footer').remove();
    
    // Get the remaining body content
    const bodyContent = $('body').html() || '';
    
    // Wrap in WordPress loop if it looks like a blog/content site
    if (bodyContent.includes('article') || bodyContent.includes('.post')) {
      return `<?php if (have_posts()) : ?>
    <?php while (have_posts()) : the_post(); ?>
        ${bodyContent}
    <?php endwhile; ?>
<?php endif; ?>`;
    }
    
    return bodyContent;
  }
  
  private generateFunctionsPhp(): string {
    return `<?php
function theme_setup() {
    // Add theme support for various features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'textdomain'),
    ));
}
add_action('after_setup_theme', 'theme_setup');

function theme_scripts() {
    wp_enqueue_style('theme-style', get_stylesheet_uri());
    
    if (file_exists(get_template_directory() . '/js/theme.js')) {
        wp_enqueue_script('theme-script', get_template_directory_uri() . '/js/theme.js', array(), '1.0.0', true);
    }
}
add_action('wp_enqueue_scripts', 'theme_scripts');
?>`;
  }
  
  private generateSinglePhp(): string {
    return `<?php get_header(); ?>

<div class="container">
    <?php while (have_posts()) : the_post(); ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
                <div class="entry-meta">
                    <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                    <span class="author"><?php the_author(); ?></span>
                </div>
            </header>

            <div class="entry-content">
                <?php the_content(); ?>
            </div>

            <footer class="entry-footer">
                <?php the_tags('<p>Tags: ', ', ', '</p>'); ?>
                <?php the_category(); ?>
            </footer>
        </article>

        <?php comments_template(); ?>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>`;
  }
  
  private generatePagePhp(): string {
    return `<?php get_header(); ?>

<div class="container">
    <?php while (have_posts()) : the_post(); ?>
        <article id="page-<?php the_ID(); ?>" <?php post_class(); ?>>
            <header class="entry-header">
                <h1 class="entry-title"><?php the_title(); ?></h1>
            </header>

            <div class="entry-content">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; ?>
</div>

<?php get_footer(); ?>`;
  }
  
  private generate404Php(): string {
    return `<?php get_header(); ?>

<div class="container">
    <section class="error-404 not-found">
        <header class="page-header">
            <h1 class="page-title"><?php _e('Oops! That page can&rsquo;t be found.', 'textdomain'); ?></h1>
        </header>

        <div class="page-content">
            <p><?php _e('It looks like nothing was found at this location. Maybe try one of the links below or a search?', 'textdomain'); ?></p>
            <?php get_search_form(); ?>
        </div>
    </section>
</div>

<?php get_footer(); ?>`;
  }
}
