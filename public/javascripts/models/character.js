(function() {
  var __slice = Array.prototype.slice, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Character = (function() {
    Character.mixin = function() {
      var key, mixin, mixins, value, _i, _len, _results;
      mixins = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = mixins.length; _i < _len; _i++) {
        mixin = mixins[_i];
        _results.push((function() {
          var _ref, _results;
          _ref = mixin.prototype;
          _results = [];
          for (key in _ref) {
            value = _ref[key];
            _results.push(this.prototype[key] = value);
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    Character.mixin(Experience);
    Character.mixin(LifeForce);
    Character.mixin(Actionable);
    Character.mixin(Moveable);
    Character.mixin(Attacking);
    function Character(opts) {
      this.opts = opts != null ? opts : {};
      this.name = this.opts.name || 'Catan';
      this.inventory = this.opts.inventory || new Inventory();
      this.level = this.opts.level || 1;
      this.initAp();
      this.initHp();
      this.initMovement();
      this.initAttacking();
      this.initExperience();
      this.sprite = this.opts.sprite || '/images/bar.gif';
      this.accuracy = this.opts.accuracy || 80 + Math.floor(this.level * 0.19);
      this.strength = this.opts.strength || this.level;
      this.weapon = this.opts.weapon || new Weapon();
      this.eventDispatch = $('');
      this.onCreate = this.opts.onCreate || function() {};
      this.onTurnStart = this.opts.onTurnStart || function() {};
      this.onTurnEnd = this.opts.onTurnEnd || function() {};
      this.onDeath = this.opts.onDeath || function() {};
      $(__bind(function() {
        return this.bindEvents();
      }, this));
    }
    Character.prototype.addedToLevel = function() {
      this.drawInfo();
      this.bindInfoClicked();
      this.bindElemClicked();
      return this.trigger('create');
    };
    Character.prototype.characterSelected = function() {
      console.log("" + this.name + " selected");
      level.clear();
      level.activePlayer = this;
      return this.showMovableCells();
    };
    Character.prototype.bindInfoClicked = function() {
      return this.info.bind('click', __bind(function() {
        return this.characterSelected();
      }, this));
    };
    Character.prototype.bindElemClicked = function() {
      return this.getElem().bind('click', __bind(function() {
        return this.characterSelected();
      }, this));
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
    return Character;
  })();
}).call(this);
