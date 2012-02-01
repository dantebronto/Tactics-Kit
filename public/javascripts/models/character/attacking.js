/* DO NOT MODIFY. This file was compiled Wed, 01 Feb 2012 01:07:44 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/attacking.coffee
 */

(function() {
  window.Attacking = (function() {
    function Attacking() {}
    Attacking.prototype.initAttacking = function() {};
    Attacking.prototype.showAttackableCells = function() {
      var matrix, speed;
      if (this.apLeft <= 0) {
        return;
      }
      speed = this.apLeft;
      matrix = Level.Matrix.newFilledMatrix(level.map.rowCount, level.map.colCount);
      matrix = this.findNeighbors(this.x, this.y, matrix, this.weapon.range, true);
      matrix.set(this.x, this.y, 0);
      matrix.each(function(x, y) {
        if (Number(this) === 1) {
          level.clear(x, y);
          return level.showCellAs('attackable', x, y);
        }
      });
      return matrix;
    };
    Attacking.prototype.attack = function(x, y) {
      if (this.apLeft <= 0) {
        return;
      }
      console.log("" + this.name + " is attacking " + x + " " + y + "!");
      this.doDamage(x, y);
      this.subtractAp(2);
      return this.characterSelected();
    };
    Attacking.prototype.doDamage = function(x, y) {
      if (!this.didMiss()) {
        return console.log('attack hit');
      }
    };
    Attacking.prototype.didMiss = function() {
      var missPercent;
      missPercent = Math.floor(Math.random() * 100 + 1);
      return missPercent > this.accuracy;
    };
    return Attacking;
  })();
}).call(this);
