(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.MainView = Backbone.View.extend({
    el: '#imageWall',
    initialize: function() {
      _.bindAll(this);
      app.collection.pictures.on('update', this.addPictures);
    },


    /**
     * Appends array of pictures (and creates a view for each one)
     */
    addPictures: function(last) {
      var pictures = (last && _.filter(app.collection.pictures.models, function(picture) {
        return picture.id < last;
      })) || app.collection.pictures.models;

      _.each(pictures, function(picture) {
        this.addPicture(picture);
      }, this);
    },

    /**
     * Creates a view.Picture for picture model and appends it to #imageWall
     */
    addPicture: function(picture) {
      picture.view = new app.view.Picture({model: picture});
      picture.view.render();
      this.$el.append(picture.view.$el);
    },

    /**
     * Creates a view.Picture for picture model and prepends it to #imageWall
     */
    prependPicture: function(picture) {
      picture.view = new app.view.Picture({model: picture});
      picture.view.render();
      this.$el.prepend(picture.view.$el);
    },

  });

  window.imageWall.routes(app);
})();