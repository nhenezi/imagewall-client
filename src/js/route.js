(function() {
  window.imageWall.routes = function(app) {
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
  };
})();
