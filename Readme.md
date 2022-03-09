# THE Port Website

This repository contains the code to run the website of THE Port Association hosted at [theport.ch](https://theport.ch).

## Project

All the latest development tasks are listed on the [Project Board](https://github.com/THEPortatCERN/THE-Port-Website/projects/1).

The tech stack is Linux, Apache 2, MySQL 5 and PHP 8. In addition, the website is built with:

* The content management system [Drupal 9](https://www.drupal.com/)
* The content editor [Gutenberg](https://drupalgutenberg.org/)
* The front-end toolkit [Bootstrap 5](https://getbootstrap.com/)

## Local Development

Three steps are necessary to run the website locally:

1. Install the virtualization software
2. Run the recipe included in this repo to automatically install the environnement and dependencies
3. Go through the installation process of the website's content management system

There are two additional steps that are optional:

* Import the website configuration, *or*
* Import the website content

The configuration of this website is included in the repository (in the [config](./config) directory). Alternatively, the website content can be provided by a contributor. Note that importing the content also includes all the necessary configuration, so only this one step would be necessary.

### Installation

The project uses [Lando](https://lando.dev/) to configure and run the development environment. Upon [installing Lando](https://lando.dev/download/), execute the following from the project's root directory:

```bash
  lando start
```

The initial setup will take a few minutes as all the required software is downloaded. A message will be shown in the terminal once completed. Visit [theport.lndo.site](http://theport.lndo.site/) in your browser and you should see the Drupal installation screen. Go through the steps to reach the database configuration. The database name, and password are `drupal9`. In the advanced database settings change the connection from `localhost` to `database` (this is the host name [configured in Lando](.lando.yml)). Upon completing the Drupal installation, you will reach a basic version of the website without any content.

### Import Content

To import content, a recent [GDPR-compliant database dump](https://www.drupal.org/project/drupal_gdpr_team) can be provided to you by one of the other repository contributors. To import the database, execute the following command in the project's root directory:

```bash
  lando db-import dump.sql.gz
```

Upon importing the database, you will want to clear the website cache by running the command `lando drush cache-rebuild`. Refresh [theport.lndo.site](http://theport.lndo.site/) in your browser and you will then see the website content.

## Import Configuration

To synchronize configuration between environments (without any content), use the following commands:

```bash
  lando drush config-import --source=../config
```

### Development Tools

The database administration software [PHPMyAdmin](https://www.phpmyadmin.net/) and the email utility [Mailhog](https://github.com/mailhog/MailHog) are also included in the environment ([see the Lando configuration file](.lando.yml)). These can be accessed at [db.theport.lndo.site](http://db.theport.lndo.site) and [mail.theport.lndo.site](http://mail.theport.lndo.site).

The project uses [Composer](https://getcomposer.org/) to manage all dependencies and [Drush](https://www.drush.org/) to run tasks from the command line. These can be called via Lando, for example:

```bash
  lando composer install
  lando drush cache-rebuild
```

Some local development settings are included in this repository, but they do not get loaded by default. Simply add the following to the end of your `settings.php` located in the folder `web/sites/default`.

```php
/**
 * Local development settings.
 */
include $app_root . '/sites/settings.local.php';
```

## Custom Configuration, Theme, and Modules

The majority of tasks are accomplished using the [Drupal administration interface](http://theport.lndo.site/user/login). For example, a new [Drupal View](https://www.drupal.org/docs/8/core/modules/views) should be created and configured there. Upon making a change in the administration interface, export the configuration as follows:

```bash
lando drush config-export --destination=../config
```

The generated configuration files can be checked into this repository.

There is a custom theme named "theport" that allows a detailed designs of the site. Please refer to the [Readme](./web/themes/custom/theport/Readme.md) in the theme's folder.

In addition there are custom modules such as the "Projects Page". Please refer to the [Readme](./web/modules/custom/projects_page/Readme.md) in the Projects Page folder.
