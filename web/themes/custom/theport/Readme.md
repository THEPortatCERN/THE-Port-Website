# THE Port Custom Theme

This theme is a sub-theme of [Bootstrap 5](https://www.drupal.org/project/bootstrap5). It contains templates for the nodes and blocks used on the website.

## Folder Structure

The Twig templates, stylesheets and scripts are grouped into sub-folders within the template directory. For example, the "about" folder contains all the files for styling the About page on the site.

## File Loading

Drupal loads the Twig templates based on a [naming convention](https://www.drupal.org/docs/theming-drupal/twig-in-drupal/twig-template-naming-conventions). The CSS and JavaScript files are attached in the Twig template. For example, at the top of a Twig file:

```twig
  {{ attach_library('theport/about') }}
```

References to the CSS and JS files are then placed in `theport.libraries.yml`. In order to see the changes, it may be necessary to clear the Drupal cache. This can be done either in the Administration area or using Drush:

```bash
  lando drush cr
```

## Customizations

The [Bootstrap library](https://getbootstrap.com/docs/5.0/getting-started/introduction/) can be customized using [Sass variables](https://getbootstrap.com/docs/5.0/customize/sass/#variable-defaults).

Upon configuring variables, you will need to recompile the Sass file. From within the `global` directory, run:

```bash
  sass global.scss global.css
```

The `global.css` file is loaded by Drupal and should be checked into the repository for convenience. [Sass](https://sass-lang.com/) is otherwise not used in other templates and does not need to be installed.

## Tools

* Use [the Sass compiler](https://sass-lang.com/install) to compile the global SCSS file to CSS.
* Use the module [Twig Tweak](https://git.drupalcode.org/project/twig_tweak/-/blob/3.x/docs/cheat-sheet.md) to make using templates simpler.
* Use the module [Twig VarDumper](https://www.drupal.org/project/twig_vardumper) to output template variables.
