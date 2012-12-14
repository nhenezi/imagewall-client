(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Represents a single picture
   */
  window.imageWall.model.Picture = Backbone.Model.extend({
    defaults: {
      id: null,
      name: '',
      path: '',
      timestamp: '',
    },
  });
})()