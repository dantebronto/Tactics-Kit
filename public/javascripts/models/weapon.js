/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:07 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/weapon.coffee
 */

(function() {

  RPG.Weapon = (function() {

    function Weapon(opts) {
      if (opts == null) opts = {};
      this.range = opts.range || 1;
      this.attack = opts.attack || 1;
      this.isRanged = opts.isRanged || false;
      this.deadRange = opts.deadRange || 1;
      this.name = opts.name || 'A Stick';
    }

    return Weapon;

  })();

}).call(this);
