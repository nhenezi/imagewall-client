(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Represents a collection of pictures
   */
  app.collection.Buttons = Backbone.Collection.extend({
    model: app.model.Button,

    initialize: function() {
      this.intervals = app.helpers.clone(app.helpers.Interval)
    },

    init: function() {
      this.intervals.clearAll();
      app.collection.tags.fetch({
        url: app.properties.url + 'index.php/tag/getNewest',
        success: function(c) {
          app.collection.tags.trigger('loadMenu', c.models);
          app.collection.tags.intervals.make(function() {
            app.collection.tags.getNew();
          }, 5000)
        }
      });
    },

    getNew: function() {
      var last = (_.max(app.collection.tags.models, function(tag) {
        return tag.id;
      })).id;
      this.fetch({
        url: app.properties.url + 'index.php/tag/getNewer/' + last,
        update: true,
        remove: false,
        success: function(c) {
          var tags = _.filter(app.collection.tags.models, function(tag) {
            return tag.id > last;
          });
          app.collection.tags.trigger('update', tags);
        },
      });
    },
  });
})();
