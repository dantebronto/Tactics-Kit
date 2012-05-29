/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:07 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/spawner.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RPG.Spawner = (function(_super) {

    __extends(Spawner, _super);

    function Spawner(opts) {
      if (opts == null) opts = {};
      Spawner.__super__.constructor.call(this, opts);
      this.maxSpawns = opts.maxSpawns || 20;
    }

    Spawner.prototype.startTurn = function() {
      var _this = this;
      Spawner.__super__.startTurn.call(this);
      return level.queue(function() {
        return _this.characterSelected();
      }).queue(function() {
        return _this.act();
      });
    };

    Spawner.prototype.specialMove = function(chancePct, cb) {
      var _this = this;
      if (chancePct > 50 || level.enemies.length > this.maxSpawns) return false;
      level.queue(function() {
        var matrix, placementTarget, spawnLevel;
        if (_this.apLeft <= 0) return;
        matrix = _this.findMovableNeighbors(_this.x, _this.y, 0);
        placementTarget = void 0;
        matrix.each(function(x, y, val) {
          if (val === 1 && level.canMoveTo(x, y)) return placementTarget = [x, y];
        });
        if (placementTarget) {
          spawnLevel = _this.level === 1 ? 1 : _this.level - 1;
          level.add(new RPG.Enemy({
            x: placementTarget[0],
            y: placementTarget[1],
            name: 'Dragon Man',
            level: spawnLevel,
            sprite: '/images/dragonMan.gif'
          }));
          return _this.endTurn();
        }
      });
      level.queue(5);
      return true;
    };

    return Spawner;

  })(RPG.Enemy);

}).call(this);
