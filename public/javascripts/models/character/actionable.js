/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:09 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/character/actionable.coffee
 */

(function() {

  RPG.Actionable = (function() {

    function Actionable() {}

    Actionable.prototype.initAp = function() {
      this.ap = this.opts.ap || 2;
      this.apLeft = this.ap;
      return this.hasGone = false;
    };

    Actionable.prototype.addAp = function(amt) {
      this.apLeft += amt;
      if (this.apLeft > this.ap) this.apLeft = this.ap;
      return this.updateInfo();
    };

    Actionable.prototype.subtractAp = function(amt) {
      var _this = this;
      if (amt == null) amt = 0;
      this.apLeft -= amt;
      if (this.apLeft <= 0) {
        this.hasGone = true;
        level.queue(function() {
          level.clear();
          return level.startNextCharacter();
        });
      }
      return this.updateInfo();
    };

    Actionable.prototype.startTurn = function(oneTurnBot) {
      var _this = this;
      if (oneTurnBot == null) oneTurnBot = false;
      if (!oneTurnBot) level.log("It's " + this.name + "'s turn");
      this.centerMapOnMe();
      if (this.isBot || oneTurnBot || this.isTypeOf('Enemy')) {
        this.characterSelected();
        this.showAttackableCells(true);
        return level.queue(2).queue(function() {
          level.clear();
          return _this.characterSelected();
        });
      } else {
        level.clear();
        return this.characterSelected();
      }
    };

    Actionable.prototype.endTurn = function() {
      this.subtractAp(this.apLeft);
      return level.clear();
    };

    return Actionable;

  })();

}).call(this);
