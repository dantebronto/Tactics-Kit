/* DO NOT MODIFY. This file was compiled Fri, 01 Jun 2012 12:59:26 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/character/experience.coffee
 */

(function() {

  RPG.Experience = (function() {

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
      this.hp = Math.floor(50.1 + this.level * 7.65);
      this.expNext = this.exp + this.hp * 10;
      this.accuracy += Math.random();
      this.strength += 1;
      this.updateInfo();
      return level.log("Level up! " + this.name + " is now level " + this.level);
    };

    return Experience;

  })();

}).call(this);
