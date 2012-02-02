(function() {
  window.Weapon = (function() {
    function Weapon(opts) {
      if (opts == null) {
        opts = {};
      }
      this.range = opts.range || 1;
      this.attack = opts.attack || 1;
      this.isRanged = opts.isRanged || false;
      this.deadRange = opts.deadRange || 1;
      this.name = opts.name || 'A Stick';
    }
    return Weapon;
  })();
}).call(this);
