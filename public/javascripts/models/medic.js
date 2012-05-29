/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/medic.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  RPG.Medic = (function(_super) {

    __extends(Medic, _super);

    function Medic() {
      Medic.__super__.constructor.apply(this, arguments);
    }

    Medic.prototype.performHealing = function(x, y) {
      var _this = this;
      level.queue(function() {
        var healedAmt, hits, img, offset, oo, target, targoo;
        if (_this.apLeft <= 0) return;
        if (!(target = RPG.Character.findByPosition(x, y))) return;
        healedAmt = Math.round(0.125 * _this.hp);
        hits = _this.createHits(healedAmt);
        hits.addClass('healing');
        level.map.statMatrix.get(x, y).append(hits).show();
        offset = (50 - hits.width()) / 2;
        hits.css({
          position: 'absolute',
          left: "" + offset + "px"
        });
        _this.subtractAp(1);
        target.addHp(Number(healedAmt));
        target.updateInfo();
        level.log("" + _this.name + " <span>&#43;</span> " + (target === _this ? 'self' : target.name) + " for " + healedAmt);
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
      return level.queue(5);
    };

    Medic.prototype.act = function() {
      var _this = this;
      if (level.enemies.length === 0 || level.players.length === 0) return;
      if (this.apLeft <= 0) {
        this.endTurn();
        return;
      }
      level.queue(function() {
        var distanceToTarget, origX, origY, sorted, target;
        if (_this.apLeft <= 0) return;
        origX = _this.x;
        origY = _this.y;
        sorted = _(level.players).sortBy(function(pl) {
          return pl.hpLeft / pl.hp;
        });
        sorted = _(sorted).select(function(pl) {
          return pl.hpLeft / pl.hp !== 1;
        });
        target = sorted[0];
        distanceToTarget = target ? _this.chebyshevDistance(target.x, target.y) : Infinity;
        if (distanceToTarget <= 1) {
          return _this.performHealing(target.x, target.y);
        } else {
          if (distanceToTarget === Infinity) {
            return RPG.Player.prototype.act.apply(_this);
          } else {
            _this.moveTo(target.x, target.y);
            return level.queue(function() {
              if (origX === _this.x && origY === _this.y) return _this.endTurn();
            });
          }
        }
      });
      return level.queue(function() {
        if (_this.apLeft > 0) {
          return _this.act();
        } else {
          return _this.endTurn();
        }
      });
    };

    Medic.prototype.addedToLevel = function() {
      var _this = this;
      Medic.__super__.addedToLevel.call(this);
      return this.medicSpecial = new RPG.Special({
        character: this,
        buttonText: 'heal',
        apCost: 1,
        action: function() {
          return _this.actionClicked();
        }
      });
    };

    Medic.prototype.actionClicked = function() {
      var burstable, myX, myY,
        _this = this;
      if (this.apLeft <= 0) return;
      myX = this.x;
      myY = this.y;
      level.map.underlayMatrix.each(function(x, y) {
        var inRange, _ref;
        inRange = _([Math.abs(myX - x), Math.abs(myY - y)]).max() < 2;
        if (inRange) {
          return (_ref = level.map.underlayMatrix.get(x, y)) != null ? _ref.addClass('healable') : void 0;
        }
      });
      burstable = new RPG.Burstable({
        type: 'healable',
        activated: function(x, y) {
          var _ref;
          if ((_ref = level.map.underlayMatrix.get(x, y)) != null ? _ref.hasClass('healable') : void 0) {
            return level.queue(function() {
              _this.performHealing(x, y);
              if (_this.apLeft > 0) return _this.actionClicked();
            });
          }
        }
      });
      return burstable.showArea();
    };

    return Medic;

  })(RPG.Player);

}).call(this);
