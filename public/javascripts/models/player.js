/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:07 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/player.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RPG.Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.addDefaultSpecials = function() {
      RPG.Special.bindAuto(this);
      return RPG.Special.bindGuard(this);
    };

    Player.prototype.distributeExperience = function() {
      var _this = this;
      return _(level.enemies).each(function(enemy) {
        return enemy.addExp(_this.exp);
      });
    };

    Player.prototype.startTurn = function(oneTurnBot) {
      var _this = this;
      if (oneTurnBot == null) oneTurnBot = false;
      Player.__super__.startTurn.call(this, oneTurnBot);
      if (this.isBot || oneTurnBot) {
        return level.queue(function() {
          return _this.characterSelected();
        }).queue(function() {
          return _this.act();
        });
      }
    };

    Player.prototype.findTarget = function() {
      var cdistance, closest, enemy, killFirsts, sorted, target, _i, _len,
        _this = this;
      sorted = _(level.enemies).sortBy(function(enemy) {
        return enemy.hpLeft;
      }).reverse();
      target = sorted[0];
      closest = {
        distance: 999,
        enemy: target
      };
      for (_i = 0, _len = sorted.length; _i < _len; _i++) {
        enemy = sorted[_i];
        cdistance = this.chebyshevDistance(enemy.x, enemy.y);
        if (cdistance <= this.weapon.range || cdistance < closest.distance) {
          closest = {
            distance: cdistance,
            enemy: enemy
          };
        }
      }
      target = closest.enemy;
      killFirsts = _(level.enemies).filter(function(e) {
        return e.isTypeOf('Medic') || e.isTypeOf('Spawner');
      });
      if (killFirsts.length > 0) {
        killFirsts = _(killFirsts).sortBy(function(e) {
          return _this.chebyshevDistance(e.x, e.y);
        });
      }
      if (killFirsts[0]) target = killFirsts[0];
      return target;
    };

    return Player;

  })(RPG.Character);

}).call(this);
