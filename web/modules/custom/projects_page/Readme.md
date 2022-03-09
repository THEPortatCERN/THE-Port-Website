# Projects Page

This module is for a custom page that lists and filters THE Port projects. The module depends on the [Project content type](/admin/structure/types/manage/project/fields).

## Front-End Development

The front-end application is located inside the "app" folder. It uses Node.js and NPM as the development tooling.

```bash
cd ./app
npm install
npm run build
```

The resulting JavaScript and CSS bundles are written into the "dist" directory. *These bundles should be checked into the repo*, as they are part of the Drupal module.

Running `npm run dev` inside the app folder will start a watch process so that the bundles get generate whenever a file is saved.
