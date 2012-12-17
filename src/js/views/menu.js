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
        // color active tag
        if (tag.get('name') == app.collection.pictures.tag) {
          tag.trigger('makeActive');
        };
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
      this.model.on('changeActive', this.makeInactive);
      this.model.on('makeActive', this.makeActive);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    makeInactive: function() {
      this.$el.removeClass('active');
    },

    makeActive: function() {
      console.log('active');
      _.each(app.collection.tags.models, function(tag) {
        tag.trigger('changeActive');
      });
      this.$el.addClass('active');
    },

    events: {
      'click': 'makeActive',
    },
  });
})();