# ImageWall

Lazy loading (infinite scroll) with long polling test :)

When new pictures are added to imageWall application (server side) clients view
is automaticaly updated with new pictures.

[LIVE DEMO](http://nikola.henezi.com/imagewall/src).

### Structure overview
* static/ - contains static files; libraries, stylesheets, images
* src/ - imageWall applcation

#### src/
* index.html - main html file; entry point. Contains underscore templates.
* js - javascript part of application, split into
** collections
** helpers
** models
** views

#### Installation instructions:
* clone/copy this repository
* clone/copy [imagewall-server](https://github.com/nhenezi/imagewall-server) and
  follow installation instructions
* edit src/js/init.js and set properties.url to root of `imagewall-server` directory
