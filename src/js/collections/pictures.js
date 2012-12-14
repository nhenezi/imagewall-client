(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Represents a collection of pictures
   */
  app.collection.Pictures = Backbone.Collection.extend({
    model: app.model.Picture,
    url: 'http://localhost/bcc/server/index.php/picture/getLatest/1/5',
  });
})();