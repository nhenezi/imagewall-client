(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Represents a collection of pictures
   */
  app.collection.Buttons = Backbone.Collection.extend({
    model: app.model.Button,

  });
})();
