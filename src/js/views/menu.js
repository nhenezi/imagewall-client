(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.Menu = Backbone.View.extend({
    el: '#main-menu',
    
    initialize: function() {
      _.bindAll(this);
      app.collection.tags.on('loadMenu', this.prependButtons);
      app.collection.tags.on('update', this.prependButtons);
    },

    prependButtons: function(tags) {
      _.each(tags, function(tag) {
        this.prependButton(tag);
      }, this);
    },

    prependButton: function(tag) {
      tag.view = new app.view.Menu.Button({model: tag});
      tag.view.render();
      this.$el.append(tag.view.$el);
    },
  });

  app.view.Menu.Button = Backbone.View.extend({
    template: _.template($('#template-menu-button').html()),
    tagName: 'li',
    initialize: function() {
      _.bindAll(this);
      this.model.on('destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },
  });
})();