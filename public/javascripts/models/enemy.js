/* DO NOT MODIFY. This file was compiled Sun, 05 Feb 2012 22:45:06 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/enemy.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy(opts) {
      Enemy.__super__.constructor.call(this, opts);
    }

    Enemy.prototype.addedToLevel = function() {
      this.drawInfo();
      this.initSprite();
      this.trigger('create');
      return this.info.find('button').hide();
    };

    Enemy.prototype.startTurn = function() {
      var _this = this;
      return level.queue(1000).queue(function() {
        return _this.characterSelected();
      }).queue(function() {
        return _this.act();
      });
    };

    Enemy.prototype.act = function() {
      var _this = this;
      return level.queue(1000).queue(function() {
        var distanceToTarget, target;
        target = _this.findTarget();
        distanceToTarget = _this.chebyshevDistance(target.x, target.y);
        if (distanceToTarget <= _this.weapon.range) {
          return _this.attack(target.x, target.y);
        } else {
          return _this.moveTo(target.x, target.y);
        }
      }).queue(function() {
        if (_this.apLeft) {
          return _this.act();
        } else {
          return level.startNextCharacter();
        }
      });
    };

    Enemy.prototype.findTarget = function() {
      var player, weakestPlayer, _i, _len, _ref;
      weakestPlayer = level.players[0];
      _ref = level.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.hpLeft < weakestPlayer.hpLeft) weakestPlayer = player;
      }
      return weakestPlayer;
    };

    Enemy.prototype.specialMove = function(chancePct, cb) {};

    Enemy.prototype.die = function() {
      Enemy.__super__.die.call(this);
      return this.distributeExperience();
    };

    Enemy.prototype.distributeExperience = function() {
      var _this = this;
      return _(level.players).each(function(player) {
        return player.addExp(_this.exp);
      });
    };

    return Enemy;

  })(Character);

}).call(this);
