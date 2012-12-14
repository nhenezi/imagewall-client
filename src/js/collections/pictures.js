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
    url: 'http://localhost/bcc/server/index.php/picture/getLatest/1/1',

    getLast: function() {
      return _.last(this.models);
    },

    getNew: function() {
      this.fetch({
        url: 'http://localhost/bcc/server/index.php/picture/getLatest/' +
          (this.getLast().get('id') || '1') + '/1',
        update: true,
        success: function(c) {
          console.log(c);
          app.collection.pictures.trigger('update', c);
        }
      });
    },
  });
})();