# Projects Page

This module is for a custom page that lists and filters THE Port projects. The module depends on the [Project content type](/admin/structure/types/manage/project/fields).

## Front-End Development

The front-end application is located inside the "app" folder. It uses Node.js and NPM as the development tooling.

```bash
cd ./app
npm install
npm run build
```

The resulting JavaScript and CSS bundles are written into the "dist" directory. _These bundles should be checked into the repo_, as they are part of the Drupal module.

Running `npm run build` will start a watch process so that the bundles get generate whenever a file is saved.

## set-up steps

1. lando composer install (this crashed due to a process time-out -> fixed by deleteing vendor + adding process-timout: 6000 to config in composer.json then rerunning the same commmand)

2. lando rebuild (to update PHP version I believe)

3. lando drush cr (takes care of clearing cache among other things(?))

4. navigate to web/modules/custom/projects_page/app -> run npm install

5. go to lando/site/user/login (login as super user) -> go to content, extend, find projects-page + install

6. data-dump.
