(function() {
  window.imageWall.routes = function(app) {
    var Router;
    Router = Backbone.Router.extend({
      routes: {
        '': 'index',
        ':tag': 'filterByTag',
      },

      init: function(tag) {
        if (app.view.mainView) {
          app.view.mainView.remove();
          app.view.mainView = null;
        }
        app.collection.pictures = new app.collection.Pictures();
        app.view.mainView = new app.view.MainView();
        app.collection.pictures.tag = tag;
        app.collection.pictures.fetch({
          url: 'http://localhost/bcc/server/index.php/picture/getLatest/1/' + app.collection.pictures.tag,
          success: function(c) {
            app.collection.pictures.trigger('loadMore', c.models);
            setInterval(function() {
              app.collection.pictures.getNew();
            }, 10000)
          }
        });

      },

      index: function() {
        this.init('');
      },

      filterByTag: function(tag) {
        this.init(tag);
      },
    });
    var routes = new Router();
    Backbone.history.start();
  };
})();
