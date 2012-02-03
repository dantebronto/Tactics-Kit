/* DO NOT MODIFY. This file was compiled Fri, 03 Feb 2012 04:28:36 GMT from
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
      if (amt == null) amt = 0;
      this.hpLeft -= amt;
      if (this.hpLeft < 0) this.hpLeft = 0;
      this.updateInfo();
      if (this.hpLeft <= 0) return this.die();
    };

    LifeForce.prototype.addHp = function(amt) {
      this.hpLeft += amt;
      if (this.hpLeft > this.hp) this.hpLeft = this.hp;
      return this.updateInfo();
    };

    LifeForce.prototype.die = function() {
      this.trigger('die');
      this.info.fadeOut('slow');
      this.animateDeath();
      this.remove();
      level.clear();
      return level.remove(this);
    };

    LifeForce.prototype.animateDeath = function() {
      var ghost, ghostClone;
      ghost = this.spriteImage.clone();
      ghost.css({
        left: "" + ((50 - this.spriteImageWidth) / 2) + "px",
        top: "" + ((50 - this.spriteImageHeight) / 2) + "px",
        position: 'absolute'
      });
      level.map.overlayMatrix.get(this.x, this.y).append(ghost);
      ghostClone = ghost.clone();
      level.map.overlayMatrix.get(this.x, this.y).append(ghostClone);
      ghost.animate({
        top: '-=200px',
        opacity: 0
      }, 2000, function() {
        return ghost.remove();
      });
      return ghostClone.fadeOut(5000, function() {
        return ghostClone.remove();
      });
    };

    return LifeForce;

  })();

}).call(this);
