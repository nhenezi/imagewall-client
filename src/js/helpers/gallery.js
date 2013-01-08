(function() {
  var tmpl;
  tmpl = _.template($('#template-gallery').html());
  $('.gallery').live('click', function(e) {
    e.preventDefault();

    $('#bg').remove();
    $('body').append(tmpl({src: this.src}));

    /*
     * Gallery functionality
     */
    // close when background is clicked
    $('#wrapper').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    $('#bg').click(function(e) {
      $(this).remove();
    });
  });
})();