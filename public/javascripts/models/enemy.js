/* DO NOT MODIFY. This file was compiled Sat, 04 Feb 2012 03:05:49 GMT from
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

    Enemy.prototype.findTarget = function() {};

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
