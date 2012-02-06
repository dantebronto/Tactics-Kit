/* DO NOT MODIFY. This file was compiled Mon, 06 Feb 2012 03:01:32 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/actionable.coffee
 */

(function() {

  window.Actionable = (function() {

    function Actionable() {}

    Actionable.prototype.initAp = function() {
      this.ap = this.opts.ap || Math.floor(4 + this.level * 0.07);
      this.apLeft = this.ap;
      return this.hasGone = false;
    };

    Actionable.prototype.addAp = function(amt) {
      this.apLeft += amt;
      if (this.apLeft > this.ap) this.apLeft = this.ap;
      return this.updateInfo();
    };

    Actionable.prototype.subtractAp = function(amt) {
      this.apLeft -= amt;
      if (this.apLeft <= 0) {
        this.hasGone = true;
        level.startNextCharacter();
      }
      return this.updateInfo();
    };

    Actionable.prototype.startTurn = function() {
      return console.log("It's " + this.name + "'s turn");
    };

    Actionable.prototype.endTurn = function() {
      this.subtractAp(this.apLeft);
      return level.clear();
    };

    return Actionable;

  })();

}).call(this);
