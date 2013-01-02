(function() {
  /*
   * Shortcuts
   */
  var app = window.imageWall;

  app.view.MainView = Backbone.View.extend({
    el: '#imageWall',
    initialize: function() {
      _.bindAll(this);
      app.collection.pictures.on('update', this.prependPictures);
      app.collection.pictures.on('loadInit', this.addPictures);
      app.collection.pictures.on('add', this.addPicture);

      // infinite scrolling
      $(window).scroll(function () {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          app.collection.pictures.getMore();
        }
      });
    },

    /**
     * Appends array of pictures (and creates a view for each one)
     */
    addPictures: function(pictures) {
      console.log('adding new pictures', pictures);
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
     * Prepends array of pictures (and creates a view for each one)
     */
    prependPictures: function(pictures) {
      _.each(pictures, function(picture) {
        this.prependPicture(picture);
      }, this);
    },


    /**
     * Creates a view.Picture for picture model and prepends it to #imageWall
     */
    prependPicture: function(picture) {
      picture.view = new app.view.Picture({model: picture});
      picture.view.render();
      this.$el.prepend(picture.view.$el);
    },

    /**
     * Overwrites default remove functionality
     */
    remove: function() {
      this.$el.html('');
    },
  });
})();