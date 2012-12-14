(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.MainView = Backbone.View.extend({
    el: '#imageWall',
    initialize: function() {
      _.bindAll(this);
      console.log(this);
      app.collection.pictures.on('update', this.addPictures);
    },


    /**
     * Appends array of pictures (and creates a view for each one)
     */
    addPictures: function(pictures) {
      _.each(pictures.models, function(picture) {
        this.addPicture(picture);
      }, this);
    },

    /**
     * creates a view.Picture for picture model and appends it to #imageWall
     */
    addPicture: function(picture) {
      picture.view = new app.view.Picture({model: picture});
      picture.view.render();
      this.$el.append(picture.view.$el);
    },
  });

  window.imageWall.routes(app);
})();