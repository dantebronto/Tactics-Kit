/* DO NOT MODIFY. This file was compiled Sun, 05 Feb 2012 23:10:34 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/attacking.coffee
 */

(function() {

  window.Attacking = (function() {

    function Attacking() {}

    Attacking.prototype.initAttacking = function() {};

    Attacking.prototype.showAttackableCells = function() {
      var matrix, speed;
      if (this.apLeft <= 0) return;
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
      var _this = this;
      matrix.each(function(x, y) {
        if (level.canAttack(x, y) && _this.chebyshevDistance(x, y) <= range) {
          return matrix.set(x, y, 1);
        }
      });
      return matrix;
    };

    Attacking.prototype.chebyshevDistance = function(x, y) {
      return _([Math.abs(this.x - x), Math.abs(this.y - y)]).max();
    };

    Attacking.prototype.attack = function(x, y, cb) {
      if (this.apLeft <= 0) return;
      console.log("" + this.name + " is attacking " + x + " " + y + "!");
      this.doDamage(x, y, cb);
      this.subtractAp(2);
      return this.characterSelected();
    };

    Attacking.prototype.doDamage = function(x, y, cb) {
      var dmg,
        _this = this;
      dmg = 0;
      _(this.strength + this.weapon.attack).times(function() {
        return dmg += _this.rollDice();
      });
      if (this.didMiss()) dmg = 'miss';
      return this.animateDamage(x, y, dmg, cb);
    };

    Attacking.prototype.animateDamage = function(x, y, dmg, cb) {
      var hits,
        _this = this;
      hits = dmg.length === 1 || dmg === 'miss' ? $("<h6>" + dmg + "</h6>") : dmg.length === 2 ? $("<h5>" + dmg + "</h5>") : dmg.length >= 3 ? (dmg = Number(dmg), dmg >= 750 ? $("<h1>" + dmg + "</h1>") : dmg >= 500 ? $("<h2>" + dmg + "</h2>") : dmg >= 250 ? $("<h3>" + dmg + "</h3>") : void 0) : $("<h4>" + dmg + "</h4>");
      return level.queue(function() {
        var _ref;
        level.map.statMatrix.get(x, y).append(hits).show();
        if (dmg !== 'miss') {
          if ((_ref = Character.findByPosition(x, y)) != null) {
            _ref.subtractHp(Number(dmg));
          }
        }
        return hits.show().shake(3, 3, 180).fadeOut(1000, function() {
          $(this).remove();
          if (cb) return cb();
        });
      });
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
