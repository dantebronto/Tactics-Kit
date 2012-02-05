/* DO NOT MODIFY. This file was compiled Sun, 05 Feb 2012 22:32:45 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/level.coffee
 */

(function() {

  window.Level = (function() {

    function Level(opts) {
      var _this = this;
      if (opts == null) opts = {};
      this.turnFunction = opts.turnFunction || function() {};
      this.endFunction = opts.endFunction || function() {};
      this.map = new Level.Map(opts.map);
      this.inventory = opts.inventory || new Inventory();
      this.players = opts.players || [];
      this.enemies = opts.enemies || [];
      this.eventDispatch = $({});
      this.anim = [];
      this.animationInterval = opts.animationInterval || 100;
      this.initAnimationQueue();
      this.activeCharacter = null;
      $(function() {
        _this.initCharacters();
        _this.win = $(window);
        _this.stage = $('#stage');
        _this.info = $('#info');
        _this.bindWindowResize();
        _this.win.trigger('resize');
        return _this.startNextCharacter();
      });
    }

    Level.prototype.remove = function(obj) {
      var _this = this;
      this.players = _(this.players).filter(function(player) {
        return obj !== player;
      });
      this.enemies = _(this.enemies).filter(function(enemy) {
        return obj !== enemy;
      });
      if (this.players.length === 0) {
        this.gameOver();
      } else if (this.enemies.length === 0) {
        this.next();
      }
      if (obj.hide) return obj.hide();
    };

    Level.prototype.add = function(obj) {
      return this.map.add(obj);
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

    Level.prototype.canAttack = function(x, y) {
      return this.map.canAttack(x, y);
    };

    Level.prototype.showCellAs = function(type, x, y) {
      return this.map.showCellAs(type, x, y);
    };

    Level.prototype.hideCellAs = function(type, x, y) {
      return this.map.hideCellAs(type, x, y);
    };

    Level.prototype.clear = function(x, y) {
      return this.map.clear(x, y);
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
      var _this = this;
      return setInterval((function() {
        return _this.nextTick();
      }), this.animationInterval);
    };

    Level.prototype.queue = function(delayOrFn) {
      if (delayOrFn == null) delayOrFn = 0;
      this.anim.push(delayOrFn);
      return this;
    };

    Level.prototype.nextTick = function() {
      if (typeof this.anim[0] === 'number') {
        this.anim[0] -= this.animationInterval;
        if (this.anim[0] <= 0) return this.anim.shift();
      } else if (typeof this.anim[0] === 'function') {
        return this.anim.shift()();
      }
    };

    Level.prototype.bindWindowResize = function() {
      var debounced, resizeFn,
        _this = this;
      resizeFn = function() {
        _this.stage.css('height', _this.win.height() + 'px');
        return _this.info.css('height', _this.win.height() + 'px');
      };
      debounced = _.debounce(resizeFn, 500);
      return this.win.resize(debounced);
    };

    Level.prototype.gameOver = function() {
      console.log('You have fallen in battle...');
      return $('body').fadeOut(5000, function() {
        return location.reload(true);
      });
    };

    Level.prototype.startNextCharacter = function() {
      var nextChar,
        _this = this;
      console.log('snc');
      console.log("" + e1.name + " has " + e1.apLeft + " ap left");
      nextChar = _(this.players.concat(this.enemies)).filter(function(char) {
        return !char.hasGone();
      })[0];
      if (nextChar != null) {
        return nextChar.startTurn();
      } else {
        return this.queue(function() {
          _this.restoreCharacters();
          return _this.startNextCharacter();
        });
      }
    };

    Level.prototype.restoreCharacters = function() {
      return _(this.players.concat(this.enemies)).each(function(char) {
        return char.addAp(char.ap);
      });
    };

    Level.prototype.next = function() {
      return alert('You win!');
    };

    return Level;

  })();

}).call(this);
