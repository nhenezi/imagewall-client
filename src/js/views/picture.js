(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.Picture = Backbone.View.extend({
    template: _.template($('#template-picture').html()),
    className: 'picture',

    initialize: function() {
      _.bindAll(this);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
  });
})();