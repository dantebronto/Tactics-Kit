(function() {
  window.Level = (function() {
    function Level(opts) {
      if (opts == null) {
        opts = {};
      }
      this.turnFunction = opts.turnFunction || function() {};
      this.endFunction = opts.endFunction || function() {};
      this.map = new Level.Map(opts.map);
      this.inventory = opts.inventory || new Inventory();
    }
    return Level;
  })();
}).call(this);
