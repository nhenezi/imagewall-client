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
      var last = this.getLast().id || '0';
      this.fetch({
        url: 'http://localhost/bcc/server/index.php/picture/getAfter/' +
          last + '/1',
        update: true,
        remove: false,
        success: function(c) {
          app.collection.pictures.trigger('update', last);
        },
      });
    },
  });
})();