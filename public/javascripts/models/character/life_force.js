/* DO NOT MODIFY. This file was compiled Mon, 30 Jan 2012 04:54:09 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/life_force.coffee
 */

(function() {
  window.LifeForce = (function() {
    function LifeForce() {}
    LifeForce.prototype.initHp = function() {
      this.hp = this.opts.hp || Math.floor(50.1 + this.level * 7.65);
      return this.hpLeft = this.hp;
    };
    LifeForce.prototype.subtractHp = function(amt) {
      if (amt == null) {
        amt = 0;
      }
      this.hpLeft -= amt;
      if (this.hpLeft < 0) {
        this.hpLeft = 0;
      }
      this.updateInfo();
      if (this.hpLeft <= 0) {
        return this.die();
      }
    };
    LifeForce.prototype.addHp = function(amt) {
      this.hpLeft += amt;
      if (this.hpLeft > this.hp) {
        this.hpLeft = this.hp;
      }
      return this.updateInfo();
    };
    LifeForce.prototype.die = function() {
      this.trigger('die');
      this.info.fadeOut('slow');
      this.remove();
      level.clear();
      return level.remove(this);
    };
    return LifeForce;
  })();
}).call(this);
