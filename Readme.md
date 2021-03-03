# THE Port Website

## Local Development

Two steps are necessary to run the website locally

1. Install and run the environment
2. Import the database

The project uses [Lando](https://lando.dev/) to configure and run the development environment. Upon installing Lando, run the following from the root directory of the project:

```bash
  lando start
```

The initial setup will take a few minutes as all the required software is downloaded. Then visit [theport.lndo.site](http://theport.lndo.site/) in your browser and you should see the Drupal installation screen. Go through the steps and you will reach a basic Drupal installation.

Next we import the database. A recent [GDPR-compliant database dump](https://www.drupal.org/project/drupal_gdpr_team) can be provided to you by one of your team colleagues.

```bash
  lando db-import dump.sql.gz
```

Refresh the page and you will then see the website.

## Configuration

To sync configuration between environments, use the following commands:

```bash
lando drush config-export --destination=../config
```

```bash
lando drush config-import --source=../config
```

The files should be checked into the repository.
