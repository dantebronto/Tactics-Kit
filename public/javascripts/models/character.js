/* DO NOT MODIFY. This file was compiled Mon, 06 Feb 2012 03:18:02 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character.coffee
 */

(function() {
  var __slice = Array.prototype.slice;

  window.Character = (function() {

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

    Character.mixin(Experience);

    Character.mixin(LifeForce);

    Character.mixin(Actionable);

    Character.mixin(Moveable);

    Character.mixin(Attacking);

    Character.mixin(PathFinding);

    function Character(opts) {
      var _this = this;
      this.opts = opts != null ? opts : {};
      this.name = this.opts.name || 'Catan';
      this.sprite = this.opts.sprite || '/images/alien.gif';
      this.inventory = this.opts.inventory || new Inventory();
      this.level = this.opts.level || 1;
      this.isBot = this.opts.isBot || false;
      this.initAp();
      this.initHp();
      this.initMovement();
      this.initAttacking();
      this.initExperience();
      this.initPathFinding();
      this.accuracy = this.opts.accuracy || 80 + Math.floor(this.level * 0.19);
      this.strength = this.opts.strength || this.level;
      this.weapon = this.opts.weapon || new Weapon();
      this.eventDispatch = $({});
      this.onCreate = this.opts.onCreate || function() {};
      this.onTurnStart = this.opts.onTurnStart || function() {};
      this.onTurnEnd = this.opts.onTurnEnd || function() {};
      this.onDeath = this.opts.onDeath || function() {};
      $(function() {
        return _this.bindEvents();
      });
      this;
    }

    Character.prototype.initSprite = function() {
      var _this = this;
      this.spriteImage = this.info.find('img');
      return this.spriteImage.load(function() {
        _this.spriteImageWidth = _this.spriteImage.width();
        return _this.spriteImageHeight = _this.spriteImage.height();
      });
    };

    Character.prototype.addedToLevel = function() {
      this.drawInfo();
      this.initSprite();
      this.bindInfoClicked();
      return this.trigger('create');
    };

    Character.prototype.characterSelected = function() {
      level.clear();
      level.activeCharacter = this;
      this.showMovableCells();
      return this.showAttackableCells();
    };

    Character.prototype.bindInfoClicked = function() {
      var _this = this;
      return this.info.bind('click', function() {
        return _this.characterSelected();
      });
    };

    Character.prototype.getElem = function() {
      return level.getElem(this);
    };

    Character.prototype.drawInfo = function() {
      this.info = $(TMPL.characterInfo(this));
      this.info.hide();
      level.map.info.find('ul').append(this.info);
      return this.info.fadeIn('slow');
    };

    Character.prototype.updateInfo = function() {
      return this.info.html($(TMPL.characterInfo(this)).html());
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
      this.on('turnEnd', this.onTurnEnd);
      return this.on('die', this.onDeath);
    };

    Character.prototype.remove = function() {
      return this.hide();
    };

    Character.prototype.hide = function() {
      return this.getElem().css('background', 'transparent').removeClass('pointer occupied');
    };

    Character.prototype.show = function() {
      return this.getElem().css('background', "url(" + this.sprite + ") no-repeat center").addClass('pointer occupied');
    };

    return Character;

  })();

}).call(this);
