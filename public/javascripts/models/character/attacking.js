/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:09 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/character/attacking.coffee
 */

(function() {

  RPG.Attacking = (function() {

    function Attacking() {}

    Attacking.prototype.initAttacking = function() {};

    Attacking.prototype.showAttackableCells = function(preview) {
      var matrix, speed;
      if (preview == null) preview = false;
      if (preview) level.clear();
      if (this.apLeft <= 0) return;
      speed = this.apLeft;
      matrix = RPG.Level.Matrix.newFilledMatrix(level.map.rowCount, level.map.colCount, 0);
      matrix = this.findAttackableNeighbors(this.x, this.y, matrix, this.weapon.range, preview);
      matrix.set(this.x, this.y, 0);
      matrix.each(function(x, y) {
        if (Number(this) === 1) return level.showCellAs('attackable', x, y);
      });
      return matrix;
    };

    Attacking.prototype.findAttackableNeighbors = function(x, y, matrix, range, preview) {
      var _this = this;
      if (preview == null) preview = false;
      matrix.each(function(x, y) {
        var attackable, inRange;
        inRange = _this.chebyshevDistance(x, y) <= range;
        attackable = level.canAttack(x, y);
        if ((preview && inRange) || (inRange && attackable)) {
          return matrix.set(x, y, 1);
        }
      });
      return matrix;
    };

    Attacking.prototype.chebyshevDistance = function(x, y, x2, y2) {
      if (x2 == null) x2 = this.x;
      if (y2 == null) y2 = this.y;
      return _([Math.abs(x - x2), Math.abs(y - y2)]).max();
    };

    Attacking.prototype.attack = function(x, y) {
      if (this.apLeft < 1) return;
      return this.doDamage(x, y);
    };

    Attacking.prototype.doDamage = function(x, y, dmg, apToSubtract, groupDamage) {
      var _this = this;
      if (dmg == null) dmg = 0;
      if (apToSubtract == null) apToSubtract = 1;
      if (dmg === 0) {
        _(this.strength + this.weapon.attack).times(function() {
          return dmg += _this.rollDice();
        });
        if (this.didMiss()) dmg = 'miss';
      }
      dmg = this.beforeDoDamage(dmg);
      this.animateDamage(x, y, dmg, apToSubtract, groupDamage);
      return this.afterDoDamage(dmg);
    };

    Attacking.prototype.createHits = function(dmg) {
      if (dmg.length === 1 || dmg === 'miss') {
        return $("<h6>" + dmg + "</h6>");
      } else if (dmg.length === 2) {
        return $("<h5>" + dmg + "</h5>");
      } else if (dmg.length >= 3) {
        dmg = Number(dmg);
        if (dmg >= 750) {
          return $("<h1>" + dmg + "</h1>");
        } else if (dmg >= 500) {
          return $("<h2>" + dmg + "</h2>");
        } else if (dmg >= 250) {
          return $("<h3>" + dmg + "</h3>");
        }
      } else {
        return $("<h4>" + dmg + "</h4>");
      }
    };

    Attacking.prototype.animateDamage = function(x, y, dmg, apToSubtract, groupDamage) {
      var hits,
        _this = this;
      if (groupDamage == null) groupDamage = false;
      hits = this.createHits(dmg);
      level.queue(function() {
        var character, img, lastHit, offset, oo, statEl, targoo;
        if (_this.apLeft <= 0) return;
        _this.subtractAp(apToSubtract);
        statEl = level.map.statMatrix.get(x, y);
        lastHit = statEl.find('h1, h2, h3, h4, h5, h6');
        if (lastHit.length > 0) lastHit.remove();
        statEl.append(hits).show();
        character = RPG.Character.findByPosition(x, y);
        offset = (50 - hits.width()) / 2;
        hits.css({
          position: 'absolute',
          left: "" + offset + "px"
        });
        if (dmg !== 'miss') {
          if (character != null) character.subtractHp(Number(dmg));
          level.log("" + _this.name + " <span>&#9876;</span> " + (character != null ? character.name : void 0) + " for " + dmg);
          if ((character != null ? character.hpLeft : void 0) === 0) {
            level.log("" + _this.name + " <span>&#9760;</span> " + character.name);
          }
        } else {
          level.log("" + _this.name + " <span>&#9876;</span> " + (character != null ? character.name : void 0) + " but missed");
        }
        _this.characterSelected();
        img = $('<img src="/images/burst.png" width="50" height="50" />');
        oo = level.map.overlayMatrix.get(_this.x, _this.y).offset();
        targoo = level.map.overlayMatrix.get(x, y).offset();
        img.appendTo(level.map.elem);
        return img.css({
          position: 'absolute',
          top: oo.top,
          left: oo.left,
          width: 50,
          height: 50
        }).animate({
          top: targoo.top,
          left: targoo.left
        }, level.animationInterval, 'swing', function() {
          img.hide();
          hits.show();
          return setTimeout((function() {
            return hits.remove();
          }), level.animationInterval * 4);
        });
      });
      if (!groupDamage) return level.queue(5);
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
