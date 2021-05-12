# THE Port Website

## Project

Development tasks are listed on the [Project Board](https://app.asana.com/0/1200042243165772/board).

The technologies in for building the website are the LAMP stack with Debian Linux 9, Apache 2, MySQL 5 and PHP 7. On top of this stack, the website is using the content management framework [Drupal 9](https://www.drupal.com/).

## Local Development

Two steps are necessary to run the website locally

1. Install the virtualization software
2. Run the recipe included in this repo to automatically install the environnement and dependencies
3. Import a snapshot of the database. Alternatively, the configuration only can be applied without any content.

The project uses [Lando](https://lando.dev/) to configure and run the development environment. Upon installing Lando, execute the following from the root directory of the project:

```bash
  lando start
```

The initial setup will take a few minutes as all the required software is downloaded. A message will be shown in the terminal once completed. Then visit [theport.lndo.site](http://theport.lndo.site/) in your browser and you should see the Drupal installation screen. Go through the steps and you will reach a basic Drupal installation.

Next we import the database. A recent [GDPR-compliant database dump](https://www.drupal.org/project/drupal_gdpr_team) can be provided to you by one of your team colleagues.

```bash
  lando db-import dump.sql.gz
```

Refresh the page and you will then see the website.

## Development Tools

The Database admin software [PHPMyAdmin](https://www.phpmyadmin.net/) and the Mail utility [Mailhog](https://github.com/mailhog/MailHog) are also included in the environment (see the Lando configuration file). These can be accessed at [db.theport.lndo.site](http://db.theport.lndo.site) and [mail.theport.lndo.site](http://mail.theport.lndo.site).

The project uses [Composer](https://getcomposer.org/) to manage all dependencies and [Drush](https://www.drush.org/) to run tasks from the command line. These can be called via Lando, for example:

```bash
  lando composer update
  lando drush cache-clear
```

## Website Theme

The majority of tasks are accomplished using the Drupal administration interface. For example, a new View should be created and configured there. There is, however, a custom theme that allows a detailed designs of the site. Please refer to the [Readme](./web/themes/custom/theport/Readme.md) in the theme folder.

## Configuration

To sync configuration between environments, use the following commands:

```bash
lando drush config-export --destination=../config
```

```bash
lando drush config-import --source=../config
```
