(function() {
  Level.Map = (function() {
    function Map(opts) {
      if (opts == null) {
        opts = {};
      }
      this.elem = $(opts.selector || '#map');
      this.width = opts.width || 410;
      this.height = opts.height || 816;
      this.backgroundImage = opts.backgroundImage || '/images/test_map.jpg';
      this.setStyles();
    }
    Map.prototype.setStyles = function() {
      return this.elem.css('width', "" + this.width + "px").css('width', "" + this.height + "px").css('background-image', "url(" + this.backgroundImage + ")");
    };
    return Map;
  })();
}).call(this);
