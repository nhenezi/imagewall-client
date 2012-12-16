(function() {
  /**
   * Shortcuts
   */
  var app = window.imageWall;

  /**
   * Interval object
   *
   */
  app.helpers.Interval = {
    //to keep a reference to all the intervals
    intervals : {},
    
    //create another interval
    make: function (fun, delay) {
      var newInterval = setInterval.apply(
        window, [fun, delay].concat([].slice.call(arguments, 2))
      );
      
      this.intervals[newInterval] = true;
      return newInterval;
    },

    /**
     * clear a single interval
     */
    clear: function (id) {
      return clearInterval( this.intervals[id] );
    },

    /**
     * clear all single interval
     */
    clearAll: function () {
      var all = Object.keys(this.intervals), len = all.length;
      while (len-- > 0) {
        clearInterval(all.shift());
      }
    }
  };
})();
