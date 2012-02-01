(function() {
  window.Weapon = (function() {
    function Weapon(opts) {
      if (opts == null) {
        opts = {};
      }
      this.range = opts.range || 1;
      this.attack = opts.attack || 1;
    }
    return Weapon;
  })();
}).call(this);
