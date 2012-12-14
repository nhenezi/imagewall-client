(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.MainView = Backbone.View.extend({
    el: '#imageWall',
    initialize: function() {
      console.log('init');
    },
  });
  window.imageWall.routes(app);
})();