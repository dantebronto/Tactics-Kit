(function() {
  window.Level = (function() {
    function Level(opts) {
      this.turnFunction = opts.turnFunction || function() {};
      this.endFunction = opts.endFunction || function() {};
      this.map = new Level.Map(opts.map);
    }
    return Level;
  })();
}).call(this);
