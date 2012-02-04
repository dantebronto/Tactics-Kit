/* DO NOT MODIFY. This file was compiled Sat, 04 Feb 2012 03:07:04 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/experience.coffee
 */

(function() {

  window.Experience = (function() {

    function Experience() {}

    Experience.prototype.initExperience = function() {
      this.exp = this.opts.exp || Math.floor(this.hp * 1.3);
      this.expNext = this.opts.expNext || Math.floor(this.hp * 1.3);
      return this.levelUp = this.opts.onLevelUp || this.onLevelUp;
    };

    Experience.prototype.addExp = function(amt) {
      var _this = this;
      return _(amt).times(function() {
        _this.exp += 1;
        _this.expNext -= 1;
        if (_this.expNext <= 0) return _this.levelUp();
      });
    };

    Experience.prototype.onLevelUp = function() {
      this.level += 1;
      this.ap = Math.floor(4 + this.level * 0.07);
      this.hp = Math.floor(50.1 + this.level * 7.65);
      this.expNext = this.hp * 5;
      this.hpLeft = this.hp;
      this.accuracy = 80 + Math.floor(this.level * 0.19);
      this.strength = this.level;
      return console.log("Level up! " + this.name + " is now level " + this.level);
    };

    return Experience;

  })();

}).call(this);
