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
        if (app.view.menu === undefined) {
          app.collection.tags = new app.collection.Buttons();
          app.collection.tags.init();
          app.view.menu = new app.view.Menu();
        }
        if (app.collection.pictures === undefined) {
          app.collection.pictures = new app.collection.Pictures();
          app.view.mainView = new app.view.MainView();
          app.collection.pictures.tag = tag;
          app.collection.pictures.init();
        }
        else {
          app.collection.pictures = new app.collection.Pictures();
          app.view.mainView = new app.view.MainView();
          app.collection.pictures.tag = tag;
          app.collection.pictures.loadInit();
        }
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

  window.imageWall.routes(window.imageWall);
})();
