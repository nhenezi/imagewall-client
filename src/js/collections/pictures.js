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
        url: app.properties.url + 'index.php/picture/getLatest/10/' + app.collection.pictures.tag,

        success: function(c) {
          app.collection.pictures.trigger('loadMore', c.models);
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
        url: app.properties.url + 'index.php/picture/getLatest/10/' + app.collection.pictures.tag,
        success: function(c) {
          app.collection.pictures.trigger('loadMore', c.models);
        }
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
        url: app.properties.url + 'index.php/picture/getAfter/' +
          last + '/1/' + app.collection.pictures.tag,
        update: true,
        remove: false,
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
      })).id
      this.fetch({
        url: app.properties.url + 'index.php/picture/getBefore/' +
          last + '/10/' + app.collection.pictures.tag,
        update: true,
        remove: false,
        success: function(c) {
          var pictures = (last && _.filter(app.collection.pictures.models, function(picture) {
            return picture.id < last;
          })) || app.collection.pictures.models;
          app.collection.pictures.trigger('loadMore', pictures);
        },
      });
    },
  });
})();