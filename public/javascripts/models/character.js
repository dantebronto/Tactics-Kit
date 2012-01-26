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
    function Character(opts) {
      this.opts = opts != null ? opts : {};
      this.name = this.opts.name || 'Catan';
      this.inventory = this.opts.inventory || level.inventory;
      this.level = this.opts.level || 1;
      this.ap = this.opts.ap || Math.floor(4 + this.level * 0.07);
      this.apLeft = this.ap;
      this.hp = this.opts.hp || Math.floor(50.1 + this.level * 7.65);
      this.hpLeft = this.hp;
      this.speed = this.opts.speed || Math.floor(this.ap / 2);
      this.initExperience();
      this.sprite = this.opts.sprite || '/images/bar.gif';
      this.weapon = this.opts.weapon || new Weapon();
      this.accuracy = this.opts.accuracy || 80 + Math.floor(this.level * 0.19);
      this.strength = this.opts.strength || this.level;
      this.x = this.opts.x || 0;
      this.y = this.opts.y || 0;
      this.eventDispatch = $('');
      this.onCreate = this.opts.onCreate || function() {};
      this.onTurnStart = this.opts.onTurnStart || function() {};
      this.onTurnEnd = this.opts.onTurnEnd || function() {};
      this.onDeath = this.opts.onDeath || function() {};
      this.bindEvents();
      $(__bind(function() {
        level.add(this);
        return this.trigger('create');
      }, this));
    }
    Character.prototype.getElem = function() {
      return level.getElem(this);
    };
    Character.prototype.bind = function(event, cb) {
      return this.eventDispatch.bind(event, cb);
    };
    Character.prototype.trigger = function(event, msg) {
      return this.eventDispatch.trigger(event, msg);
    };
    Character.prototype.bindEvents = function() {
      this.bind('create', this.onCreate);
      this.bind('turnStart', this.onTurnStart);
      this.bind('turnEnd', this.onTurnEnd);
      return this.bind('death', this.onDeath);
    };
    return Character;
  })();
}).call(this);
