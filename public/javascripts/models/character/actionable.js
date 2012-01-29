/* DO NOT MODIFY. This file was compiled Fri, 27 Jan 2012 22:46:48 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/actionable.coffee
 */

(function() {
  window.Actionable = (function() {
    function Actionable() {}
    Actionable.prototype.initAp = function() {
      this.ap = this.opts.ap || Math.floor(4 + this.level * 0.07);
      return this.apLeft = this.ap;
    };
    Actionable.prototype.addAp = function(amt) {
      this.apLeft += amt;
      if (this.apLeft > this.ap) {
        this.apLeft = this.ap;
      }
      return this.updateInfo();
    };
    Actionable.prototype.subtractAp = function(amt) {
      this.apLeft -= amt;
      if (this.apLeft < 0) {
        this.apLeft = 0;
        this.endTurn();
      }
      return this.updateInfo();
    };
    Actionable.prototype.hasGone = function() {
      return this.apLeft === 0;
    };
    Actionable.prototype.endTurn = function() {
      return this.subtractAp(this.apLeft);
    };
    return Actionable;
  })();
}).call(this);
