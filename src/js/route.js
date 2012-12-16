(function() {
  window.imageWall.routes = function(app) {
    var Router;
    Router = Backbone.Router.extend({
      routes: {
        '': 'index',
      },

      index: function() {
        app.collection.pictures = new app.collection.Pictures();
        app.view.mainView = new app.view.MainView();
        app.collection.pictures.fetch({
          update: true,
          success: function(c) {
            app.collection.pictures.trigger('loadMore', c.models);
            setInterval(function() {
              app.collection.pictures.getNew();
            }, 10000)
          }
        });
      },
    });
    var routes = new Router();
    Backbone.history.start();
  };
})();
