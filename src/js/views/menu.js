(function() {
  /*
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.Menu = Backbone.View.extend({
    el: '#main-menu',
    /*
     * #no-tag is as special button
     * when selected, there is no filtering by tag,
     * all pictures are selected
     *
     * It's not read from database and requires special care :)
     */
    
    initialize: function() {
      _.bindAll(this);
      app.collection.tags.on('loadMenu', this.prependButtons);
      app.collection.tags.on('update', this.prependButtons);
    },

    /**
     * Prepends (adds after current element) array of buttons
     */
    prependButtons: function(tags) {
      _.each(tags, function(tag) {
        this.prependButton(tag);
        // color active tag
        if (tag.get('name') == app.collection.pictures.tag) {
          tag.trigger('makeActive');
        };
      }, this);
    },

    /**
     * Prepends (adds after current element) one button
     */
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

      var that = this;
      $("#no-tag").on('click', function() {
        that.makeInactive();
        $(this).addClass('active');
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    },

    /**
     * Makes current tab inactive
     */
    makeInactive: function() {
      this.$el.removeClass('active');
    },

    /**
     * Makes current tab active and all others inactive
     */
    makeActive: function() {
      _.each(app.collection.tags.models, function(tag) {
        tag.trigger('changeActive');
      });
      $('#no-tag').removeClass('active');
      this.$el.addClass('active');
    },

    events: {
      'click': 'makeActive',
    },
  });
})();