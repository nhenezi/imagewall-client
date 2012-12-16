(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Represents a single picture
   */
  window.imageWall.model.Button = Backbone.Model.extend({
    defaults: {
      name: '',
    },
  });
})()