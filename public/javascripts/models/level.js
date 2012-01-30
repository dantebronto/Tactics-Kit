(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Level = (function() {
    function Level(opts) {
      if (opts == null) {
        opts = {};
      }
      this.turnFunction = opts.turnFunction || function() {};
      this.endFunction = opts.endFunction || function() {};
      this.map = new Level.Map(opts.map);
      this.inventory = opts.inventory || new Inventory();
      this.players = opts.players || [];
      this.enemies = opts.enemies || [];
      this.eventDispatch = $('');
      this.activePlayer = null;
      this.animationSpeed = opts.animationSpeed || 500;
      this.initAnimationQueue();
      $(__bind(function() {
        return this.initCharacters();
      }, this));
    }
    Level.prototype.add = function(obj) {
      return this.map.add(obj);
    };
    Level.prototype.remove = function(obj) {
      return this.map.remove(obj);
    };
    Level.prototype.getElem = function(obj) {
      return this.map.getElem(obj);
    };
    Level.prototype.canMoveTo = function(x, y) {
      return this.map.canMoveTo(x, y);
    };
    Level.prototype.canWalkOn = function(x, y) {
      return this.map.canWalkOn(x, y);
    };
    Level.prototype.showCellAs = function(type, x, y) {
      return this.map.showCellAs(type, x, y);
    };
    Level.prototype.hideCellAs = function(type, x, y) {
      return this.map.hideCellAs(type, x, y);
    };
    Level.prototype.clear = function() {
      return this.map.clear();
    };
    Level.prototype.on = function(event, cb) {
      return this.eventDispatch.bind(event, cb);
    };
    Level.prototype.trigger = function(event, msg) {
      return this.eventDispatch.trigger(event, msg);
    };
    Level.prototype.initCharacters = function() {
      var enemy, player, _i, _j, _len, _len2, _ref, _ref2, _results;
      if (this.players.length > 0) {
        _ref = this.players;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          this.add(player);
        }
      }
      if (this.enemies.length > 0) {
        _ref2 = this.enemies;
        _results = [];
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          enemy = _ref2[_j];
          _results.push(this.add(enemy));
        }
        return _results;
      }
    };
    Level.prototype.initAnimationQueue = function() {
      this.aQ = [];
      return setInterval((__bind(function() {
        return this.tick();
      }, this)), this.animationSpeed);
    };
    Level.prototype.animate = function(args) {
      var arg, _i, _len, _results;
      if (typeof args === 'object') {
        _results = [];
        for (_i = 0, _len = args.length; _i < _len; _i++) {
          arg = args[_i];
          _results.push(this.aQ.push(arg));
        }
        return _results;
      } else {
        return this.aQ.push(args);
      }
    };
    Level.prototype.tick = function() {
      if (!(this.aQ.length > 0)) {
        return;
      }
      if (typeof this.aQ[0] === 'function') {
        this.aQ[0]();
      } else {
        this.aQ[0] -= this.animationSpeed;
      }
      return this.aQ.shift();
    };
    return Level;
  })();
}).call(this);
