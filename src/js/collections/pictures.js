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
    url: 'http://localhost/bcc/server/index.php/picture/getLatest/1',

    getLast: function() {
      return _.last(this.models);
    },

    getNew: function() {
      var last = (_.max(app.collection.pictures.models, function(picture) {
        return picture.id;
      })).id;
      this.fetch({
        url: 'http://localhost/bcc/server/index.php/picture/getAfter/' +
          last + '/1',
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

    getMore: function() {
      var last = this.getLast().id || '0';
      this.fetch({
        url: 'http://localhost/bcc/server/index.php/picture/getBefore/' +
          last + '/1',
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