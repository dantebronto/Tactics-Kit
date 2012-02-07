/* DO NOT MODIFY. This file was compiled Mon, 06 Feb 2012 05:05:12 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/player.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.distributeExperience = function() {
      var _this = this;
      return _(level.enemies).each(function(enemy) {
        return enemy.addExp(_this.exp);
      });
    };

    Player.prototype.addedToLevel = function() {
      this.drawInfo();
      this.initSprite();
      return this.trigger('create');
    };

    Player.prototype.startTurn = function() {
      var _this = this;
      if (this.isBot) {
        return level.queue(function() {
          return _this.characterSelected();
        }).queue(function() {
          return _this.act();
        });
      }
    };

    Player.prototype.act = function() {
      var _this = this;
      level.queue(function() {
        var distanceToTarget, target;
        if (target = _this.findTarget()) {
          if (!target) return;
          distanceToTarget = _this.chebyshevDistance(target.x, target.y);
          if (distanceToTarget <= _this.weapon.range) {
            return _this.attack(target.x, target.y);
          } else {
            return _this.moveTo(target.x, target.y);
          }
        }
      });
      return level.queue(function() {
        if (_this.apLeft > 1) {
          return _this.act();
        } else {
          return _this.endTurn();
        }
      });
    };

    Player.prototype.findTarget = function() {
      var enemy, weakestEnemy, _i, _len, _ref;
      weakestEnemy = level.enemies[0];
      _ref = level.enemies;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        enemy = _ref[_i];
        if (enemy.hpLeft < weakestEnemy.hpLeft) weakestEnemy = enemy;
      }
      return weakestEnemy;
    };

    return Player;

  })(Character);

}).call(this);
