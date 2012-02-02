/* DO NOT MODIFY. This file was compiled Thu, 02 Feb 2012 05:00:25 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/attacking.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Attacking = (function() {
    function Attacking() {}
    Attacking.prototype.initAttacking = function() {};
    Attacking.prototype.showAttackableCells = function() {
      var matrix, speed;
      if (this.apLeft <= 0) {
        return;
      }
      speed = this.apLeft;
      matrix = Level.Matrix.newFilledMatrix(level.map.rowCount, level.map.colCount, 0);
      matrix = this.findAttackableNeighbors(this.x, this.y, matrix, this.weapon.range);
      matrix.set(this.x, this.y, 0);
      matrix.each(function(x, y) {
        if (Number(this) === 1) {
          level.clear(x, y);
          return level.showCellAs('attackable', x, y);
        }
      });
      return matrix;
    };
    Attacking.prototype.findAttackableNeighbors = function(x, y, matrix, range) {
      matrix.each(__bind(function(x, y) {
        if (level.canAttack(x, y) && this.chebyshevDistance(x, y) <= range) {
          return matrix.set(x, y, 1);
        }
      }, this));
      return matrix;
    };
    Attacking.prototype.chebyshevDistance = function(x, y) {
      return _([Math.abs(this.x - x), Math.abs(this.y - y)]).max();
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
      var dmg;
      dmg = 0;
      _(this.strength + this.weapon.attack).times(__bind(function() {
        return dmg += this.rollDice();
      }, this));
      if (this.didMiss()) {
        dmg = 'miss';
      }
      return this.animateDamage(x, y, dmg);
    };
    Attacking.prototype.animateDamage = function(x, y, dmg) {
      var hits;
      hits = dmg.length === 1 || dmg === 'miss' ? $("<h6>" + dmg + "</h6>") : dmg.length === 2 ? $("<h5>" + dmg + "</h5>") : dmg.length >= 3 ? (dmg = Number(dmg), dmg >= 750 ? $("<h1>" + dmg + "</h1>") : dmg >= 500 ? $("<h2>" + dmg + "</h2>") : dmg >= 250 ? $("<h3>" + dmg + "</h3>") : void 0) : $("<h4>" + dmg + "</h4>");
      level.queue(function() {
        return level.map.statMatrix.get(x, y).html(hits).show().shake(3, 3, 180).fadeOut(1200);
      });
      return level.animate();
    };
    Attacking.prototype.didMiss = function() {
      var missPercent;
      missPercent = Math.floor(Math.random() * 100 + 1);
      return missPercent > this.accuracy;
    };
    Attacking.prototype.rollDice = function() {
      return Math.floor(Math.random() * 3 + 1);
    };
    return Attacking;
  })();
}).call(this);
