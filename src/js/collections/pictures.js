(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Represents a collection of pictures
   */
  app.collection.Pictures = Backbone.Collection.extend({
    model: app.model.Picture,

    initialize: function() {
      this.tag = '';
      this.intervals = app.helpers.clone(app.helpers.Interval);
      this.intervals.intervals = null;
      this.intervals.intervals = {};
    },

    /**
     * Starts long polling
     */
    init: function() {
      this.intervals.clearAll();
      app.collection.pictures.fetch({
        url: app.properties.url + '/picture/getLatest/10/' + app.collection.pictures.tag,

        success: function(c) {
          app.collection.pictures.intervals.make(function() {
            app.collection.pictures.getNew();
          }, 5000)
        }
      });
    },

    /**
     * Fetches initial set of pictures
     */
    getInitial: function() {
      app.collection.pictures.fetch({
        url: app.properties.url + '/picture/getLatest/10/' + app.collection.pictures.tag,
      });
    },


    /**
     * Fetches new pictures
     */
    getNew: function() {
      var last = (_.max(app.collection.pictures.models, function(picture) {
        return picture.id;
      })).id;
      this.fetch({
        url: app.properties.url + '/picture/getAfter/' +
          last + '/1/' + app.collection.pictures.tag,
        update: true,
        remove: false,
        silent: true,
        success: function(c) {
          var pictures = _.filter(app.collection.pictures.models, function(picture) {
            return picture.id > last;
          });
          app.collection.pictures.trigger('update', pictures);
        },
      });
    },

    /**
     * Fetches more pictures
     */
    getMore: function() {
      var last = (_.min(app.collection.pictures.models, function(picture) {
        return picture.id;
      })).id;
      this.fetch({
        url: app.properties.url + '/picture/getBefore/' +
          last + '/10/' + app.collection.pictures.tag,
        update: true,
        remove: false,
      });
    },
  });
})();