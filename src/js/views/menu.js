(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.Menu = Backbone.View.extend({
    el: 'main-menu',
  });


  app.view.Menu.Button = Backbone.View.extend({
    template: _.template($('#template-menu-button').html()),
    initialize: function() {
      _.bindAll(this);
      this.model.on('destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
  });
})();