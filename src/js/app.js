(function() {
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
  console.log(window.imageWall);
  window.imageWall.routes(app);
})();