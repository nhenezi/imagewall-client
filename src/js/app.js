(function() {
  window.imageWall = {
    view: {},
    model: {},
    route: {},
    collection: {},
  };

  /**
   * Shortcuts
   */
  var app;
  app = window.imageWall;
  console.log(app, window.imageWall);

  app.view.MainView = Backbone.View.extend({
    el: '#imageWall',
    initialize: function() {
      console.log('init');
    },
  });

  /**
   * Routes
   */
  var Router;
  Router = Backbone.Router.extend({
    routes: {
      '': 'index',
    },
    index: function() {
      app.view.mainView = new app.view.MainView();
    },
  });
  var routes = new Router();
  Backbone.history.start();

})();