/* DO NOT MODIFY. This file was compiled Fri, 01 Jun 2012 13:30:16 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/engineer.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RPG.Engineer = (function(_super) {

    __extends(Engineer, _super);

    function Engineer(opts) {
      this.specialMove = __bind(this.specialMove, this);
      var _this = this;
      Engineer.__super__.constructor.call(this, opts);
      this.turretCount = 0;
      this.eventDispatch.bind('afterUpdateInfo', function() {
        if (_this.turretCount >= 1) {
          return _this.engineeringSpecial.disabled = true;
        }
      });
    }

    Engineer.prototype.addedToLevel = function() {
      var _this = this;
      Engineer.__super__.addedToLevel.call(this);
      return this.engineeringSpecial = new RPG.Special({
        character: this,
        buttonText: 'turret',
        apCost: 2,
        action: function() {
          var myX, myY;
          if (_this.turretCount >= 1) {
            _this.engineeringSpecial.disabled = true;
            return;
          }
          myX = _this.x;
          myY = _this.y;
          level.map.underlayMatrix.each(function(x, y) {
            var inRange, _ref;
            inRange = _([Math.abs(myX - x), Math.abs(myY - y)]).max() < 2;
            if (inRange && level.canMoveTo(x, y)) {
              return (_ref = level.map.underlayMatrix.get(x, y)) != null ? _ref.addClass('healable') : void 0;
            }
          });
          new RPG.Burstable({
            type: 'healable',
            activated: function(x, y) {
              if (level.canMoveTo(x, y)) {
                return new Engineer.Turret({
                  x: x,
                  y: y,
                  special: _this.engineeringSpecial,
                  creator: _this
                });
              }
            }
          }).showArea();
          return $('body').one('click', function(e) {
            var _ref;
            level.clear();
            return (_ref = level.activeCharacter) != null ? _ref.characterSelected() : void 0;
          });
        }
      });
    };

    Engineer.prototype.specialMove = function() {
      var bestPlacement, chard, closestDistance, matrix, shouldBuildTurret, target,
        _this = this;
      chard = this.engineeringSpecial.character;
      matrix = RPG.Level.Matrix.newFilledMatrix(level.map.rowCount, level.map.colCount, 0);
      matrix = chard.findAttackableNeighbors(chard.x, chard.y, matrix, 3);
      shouldBuildTurret = this.turretCount < 1;
      if (shouldBuildTurret) {
        shouldBuildTurret = false;
        matrix.each(function(x, y, val) {
          if (val === 1) return shouldBuildTurret = true;
        });
        if (shouldBuildTurret) {
          if (!(target = this.findTarget())) return;
          matrix = this.findMovableNeighbors(this.x, this.y, 0);
          bestPlacement = void 0;
          closestDistance = Infinity;
          matrix.each(function(x, y, val) {
            var dist;
            if (val === 1) {
              dist = _this.chebyshevDistance(x, y, target.x, target.y);
              if (dist < closestDistance) {
                closestDistance = dist;
                return bestPlacement = [x, y];
              }
            }
          });
          if (bestPlacement) {
            new Engineer.Turret({
              x: bestPlacement[0],
              y: bestPlacement[1],
              special: this.engineeringSpecial,
              creator: this
            });
            return true;
          }
        }
      }
      return false;
    };

    return Engineer;

  })(RPG.Player);

  RPG.Engineer.Turret = (function(_super) {

    __extends(Turret, _super);

    function Turret(opts) {
      var spawnLevel,
        _this = this;
      Turret.__super__.constructor.call(this, opts);
      this.special = opts.special;
      this.creator = opts.creator;
      this.exp = opts.exp || 0;
      this.name = opts.name || 'Turret';
      this.ap = opts.ap || 2;
      this.apLeft = this.ap;
      spawnLevel = this.creator.level === 1 ? 1 : this.creator.level - 1;
      this.level = opts.level || spawnLevel;
      this.sprite = opts.sprite || '/images/turret.png';
      this.isBot = opts.isBot || true;
      this.weapon = opts.weapon || new RPG.Weapon({
        range: 3
      });
      this.onDeath = opts.onDeath || function() {
        _this.creator.turretCount -= 1;
        if (_this.creator.turretCount < 0) _this.creator.turretCount = 0;
        if (_this.creator.turretCount < 1) return _this.special.disabled = false;
      };
      this.moveTo = opts.moveTo || function() {};
      this.showMovableCells = opts.showMovableCells || function() {};
      level.add(this);
      this.creator.subtractAp(this.special.apCost || 2);
      this.creator.turretCount += 1;
      if (this.creator.turretCount >= 2) this.special.disabled = true;
      ({
        findTarget: function() {
          return RPG.TargetingHelper.closest(this);
        }
      });
    }

    return Turret;

  })(RPG.Player);

}).call(this);
