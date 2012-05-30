/* DO NOT MODIFY. This file was compiled Wed, 30 May 2012 21:07:47 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/character.coffee
 */

(function() {
  var __slice = Array.prototype.slice;

  RPG.Character = (function() {

    Character.findByPosition = function(x, y) {
      return _(level.players.concat(level.enemies)).select(function(char) {
        return char.x === x && char.y === y;
      })[0];
    };

    Character.mixin = function() {
      var key, mixin, mixins, value, _i, _len, _results;
      mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = mixins.length; _i < _len; _i++) {
        mixin = mixins[_i];
        _results.push((function() {
          var _ref, _results2;
          _ref = mixin.prototype;
          _results2 = [];
          for (key in _ref) {
            value = _ref[key];
            _results2.push(this.prototype[key] = value);
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    Character.mixin(RPG.Experience);

    Character.mixin(RPG.LifeForce);

    Character.mixin(RPG.Actionable);

    Character.mixin(RPG.Movable);

    Character.mixin(RPG.Attacking);

    Character.mixin(RPG.PathFinding);

    function Character(opts) {
      var _this = this;
      this.opts = opts != null ? opts : {};
      this.name = this.opts.name || 'Catan';
      this.sprite = this.opts.sprite || '/images/alien.gif';
      this.inventory = this.opts.inventory || new RPG.Inventory();
      this.level = this.opts.level || 1;
      this.isBot = this.opts.isBot || false;
      this.specials = this.opts.specials || [];
      this.initAp();
      this.initHp();
      this.initMovement();
      this.initAttacking();
      this.initExperience();
      this.initPathFinding();
      this.accuracy = this.opts.accuracy || 80 + Math.floor(this.level * 0.19);
      this.strength = this.opts.strength || this.level;
      this.weapon = this.opts.weapon || new RPG.Weapon();
      this.eventDispatch = $({});
      this.onCreate = this.opts.onCreate || function() {};
      this.onTurnStart = this.opts.onTurnStart || function() {};
      this.onTurnEnd = this.opts.onTurnEnd || function() {};
      this.onDeath = this.opts.onDeath || function() {};
      this.beforeDoDamage = this.opts.beforeDoDamage || function(dmg) {
        return dmg;
      };
      this.afterDoDamage = this.opts.afterDoDamage || function(dmg) {
        return dmg;
      };
      this.beforeMove = this.opts.beforeMove || function() {};
      this.afterMove = this.opts.afterMove || function() {};
      $(function() {
        return _this.bindEvents();
      });
      this;
    }

    Character.prototype.isTypeOf = function(klazzString) {
      var next_proto, retval;
      next_proto = this.__proto__;
      retval = [];
      while (next_proto.constructor.name !== "Object") {
        retval.push(next_proto.constructor.name);
        next_proto = next_proto.__proto__;
      }
      return _(retval).include(klazzString);
    };

    Character.prototype.initSprite = function() {
      var _this = this;
      this.spriteImage = this.info.find('img').clone();
      this.spriteImage.load(function() {
        _this.spriteImageWidth = _this.spriteImage[0].width;
        _this.spriteImageHeight = _this.spriteImage[0].height;
        return $(function() {
          return _this.show();
        });
      });
      return this.spriteImage.attr('src', this.spriteImage.attr('src') + '?' + Math.random());
    };

    Character.prototype.addedToLevel = function() {
      this.drawInfo();
      this.initSprite();
      this.bindInfoClicked();
      return this.trigger('create');
    };

    Character.prototype.characterSelected = function(secondary) {
      var arrow;
      if (secondary == null) secondary = false;
      level.map.elem.find('img.turn-indicator').remove();
      arrow = $("<img class='turn-indicator' src='/images/arrow.png' />");
      level.map.overlayMatrix.get(this.x, this.y).prepend(arrow);
      level.clear();
      level.activeCharacter = this;
      this.showMovableCells();
      return this.showAttackableCells(secondary);
    };

    Character.prototype.centerMapOnMe = function() {
      var el, mapHeight, mapLeft, mapScrollLeft, mapScrollTop, mapWidth, myLeft, myOffset, myTop;
      el = this.getElem();
      if (!el) return;
      mapLeft = level.stage.position().left;
      myOffset = el.offset();
      myLeft = myOffset.left;
      myTop = myOffset.top;
      mapScrollTop = level.stage.scrollTop();
      mapHeight = level.stage.height();
      mapScrollLeft = level.stage.scrollLeft();
      mapWidth = level.stage.width();
      if (myTop < 0) {
        level.stage.scrollTop(mapScrollTop + myTop - (mapHeight / 2));
      } else if (myTop >= (mapScrollTop + mapHeight - 40)) {
        level.stage.scrollTop(mapScrollTop + myTop - (mapHeight / 2));
      }
      if (myLeft < 120) {
        return level.stage.scrollLeft(mapScrollLeft + myLeft - (mapWidth / 2));
      } else if (myLeft >= (mapScrollLeft + mapWidth)) {
        return level.stage.scrollLeft(mapScrollLeft + myLeft - (mapWidth / 2));
      }
    };

    Character.prototype.act = function() {
      var didMove, origX, origY,
        _this = this;
      origX = this.x;
      origY = this.y;
      if (level.enemies.length === 0 || level.players.length === 0) return;
      didMove = this.specialMove(Math.random() * 100 + 1);
      if (!didMove) {
        level.queue(function() {
          var distanceToTarget, target;
          if (_this.apLeft <= 0) return;
          target = _this.findTarget();
          distanceToTarget = target ? _this.chebyshevDistance(target.x, target.y) : Infinity;
          if (distanceToTarget <= _this.weapon.range) {
            return _this.attack(target.x, target.y);
          } else {
            if (distanceToTarget !== Infinity) _this.moveTo(target.x, target.y);
            return level.queue(function() {
              if (origX === _this.x && origY === _this.y) return _this.endTurn();
            });
          }
        });
      }
      return level.queue(function() {
        if (_this.apLeft > 0) {
          return _this.act();
        } else {
          return _this.endTurn();
        }
      });
    };

    Character.prototype.bindInfoClicked = function() {
      var _this = this;
      return this.info.bind('click', function() {
        _this.centerMapOnMe();
        return _this.characterSelected();
      });
    };

    Character.prototype.getElem = function() {
      return level.getElem(this);
    };

    Character.prototype.drawInfo = function() {
      var _this = this;
      this.info = $(TMPL.characterInfo(this));
      this.info.hide();
      level.map.info.find('ul').append(this.info);
      this.info.fadeIn('slow');
      this.info.on('mouseover', function() {
        var arrow;
        level.map.elem.find('img.turn-indicator').remove();
        arrow = $("<img class='turn-indicator' src='/images/arrow.png' />");
        return level.map.overlayMatrix.get(_this.x, _this.y).prepend(arrow);
      });
      return this.info.on('mouseout', function() {
        var ac, arrow;
        level.map.elem.find('img.turn-indicator').remove();
        arrow = $("<img class='turn-indicator' src='/images/arrow.png' />");
        if (ac = level.activeCharacter) {
          return level.map.overlayMatrix.get(ac.x, ac.y).prepend(arrow);
        }
      });
    };

    Character.prototype.updateInfo = function() {
      var el;
      this.eventDispatch.trigger('beforeUpdateInfo');
      this.info.html($(TMPL.characterInfo(this)).html());
      if (el = this.getElem()) {
        el.find('.hp').css('width', "" + ((this.hpLeft / this.hp) * 100) + "%");
        el.find('.ap').css('width', "" + ((this.apLeft / this.ap) * 100) + "%");
      }
      return this.eventDispatch.trigger('afterUpdateInfo');
    };

    Character.prototype.on = function(event, cb) {
      return this.eventDispatch.bind(event, cb);
    };

    Character.prototype.trigger = function(event, msg) {
      return this.eventDispatch.trigger(event, msg);
    };

    Character.prototype.bindEvents = function() {
      this.on('create', this.onCreate);
      this.on('turnStart', this.onTurnStart);
      return this.on('turnEnd', this.onTurnEnd);
    };

    Character.prototype.remove = function() {
      return this.hide();
    };

    Character.prototype.hide = function() {
      var el;
      el = this.getElem();
      el.css('background', 'transparent').removeClass('pointer occupied oversized');
      return el.find('.small').remove();
    };

    Character.prototype.show = function() {
      var el;
      if (el = this.getElem()) {
        el.css('background', "url(" + this.sprite + ") no-repeat center").addClass('pointer occupied');
        if (this.spriteImageWidth > 50 || this.spriteImageHeight > 50) {
          el.addClass('oversized');
        }
        return el.append('<div class="hp small"></div><div class="ap small"></div>');
      }
    };

    Character.prototype.specialMove = function(chancePct, cb) {
      return false;
    };

    return Character;

  })();

}).call(this);
