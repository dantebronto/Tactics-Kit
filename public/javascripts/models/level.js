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
    Level.prototype.add = function(obj) {
      return this.map.add(obj);
    };
    Level.prototype.getElem = function(obj) {
      return this.map.getElem(obj);
    };
    return Level;
  })();
}).call(this);
