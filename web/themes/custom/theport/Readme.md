# THE Port Custom Theme

## Customizations

To customize look and feel of subtheme override SCSS variables. Full list of variables is in `themes/contrib/bootstrap5/dist/bootstrap/5.0.0-beta1/scss/_variables.scss` or `themes/contrib/bootstrap5/scss/_theme_variables.scss`.

* Bootstrap 5 variables for font-face, font-sizes, colours, etc [Read more](https://getbootstrap.com/docs/5.0/customize/sass/#variable-defaults)
* Bootstrap 5 Theme specific variables `scss/_theme_variables.scss` for site logo image size, region paddings, etc

To review changes to Bootstrap 5 subtheme easily load style guide page. The link will be available on `Manage theme` configuration page. Style guide is particular useful for accessibility testing (contrasts of background colours to text colours).

Upon configuring variables, you will need to recompile the Sass file:

```bash
  sass .\style.scss ..\css\style.css
```

## Tools

* Use [the Sass compiler](https://sass-lang.com/install) to compile SCSS to CSS.
