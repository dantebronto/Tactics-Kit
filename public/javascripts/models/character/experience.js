(function() {
  window.Experience = (function() {
    function Experience() {}
    Experience.prototype.initExperience = function() {
      this.exp = this.opts.exp || 0;
      this.expNext = this.opts.expNext || Math.floor(this.hp * 1.3);
      return this.levelUp = this.opts.onLevelUp || this.onLevelUp;
    };
    Experience.prototype.addExp = function(amt) {
      var i, _results;
      _results = [];
      for (i = 1; (1 <= amt ? i <= amt : i >= amt); (1 <= amt ? i += 1 : i -= 1)) {
        this.exp += 1;
        this.expNext -= 1;
        _results.push(this.expNext <= 0 ? this.levelUp() : void 0);
      }
      return _results;
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
