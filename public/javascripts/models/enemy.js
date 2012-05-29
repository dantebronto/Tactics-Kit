/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/enemy.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RPG.Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy(opts) {
      Enemy.__super__.constructor.call(this, opts);
    }

    Enemy.prototype.bindInfoClicked = function() {
      var _this = this;
      return this.info.bind('click', function() {
        return _this.centerMapOnMe();
      });
    };

    Enemy.prototype.startTurn = function() {
      var _this = this;
      Enemy.__super__.startTurn.call(this);
      return level.queue(function() {
        return _this.characterSelected();
      }).queue(function() {
        return _this.act();
      });
    };

    Enemy.prototype.findTarget = function() {
      var enemy, sorted, target, _i, _len;
      sorted = _(level.players).sortBy(function(enemy) {
        return enemy.hpLeft;
      });
      target = sorted[0];
      for (_i = 0, _len = sorted.length; _i < _len; _i++) {
        enemy = sorted[_i];
        if (this.chebyshevDistance(enemy.x, enemy.y) <= this.weapon.range) {
          target = enemy;
        }
      }
      return target;
    };

    Enemy.prototype.distributeExperience = function() {
      var _this = this;
      return _(level.players).each(function(player) {
        return player.addExp(_this.exp);
      });
    };

    Enemy.prototype.onLevelUp = function() {};

    return Enemy;

  })(RPG.Character);

}).call(this);
