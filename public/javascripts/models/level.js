/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/level.coffee
 */

(function() {
  var __slice = Array.prototype.slice;

  RPG.Level = (function() {

    function Level(opts) {
      var _this = this;
      if (opts == null) opts = {};
      this.number = opts.number || 1;
      this.turnFunction = opts.turnFunction || function() {};
      this.endFunction = opts.endFunction || function() {};
      this.map = new RPG.Level.Map(opts.map);
      this.inventory = opts.inventory || new RPG.Inventory();
      this.players = opts.players || [];
      this.enemies = opts.enemies || [];
      this.eventDispatch = $({});
      this.turnNum = 1;
      this.turnStart = opts.turnStart || function() {};
      this.anim = [];
      this.animationInterval = opts.animationInterval || 150;
      this.load = this.queue;
      this.start = this.startNextCharacter;
      this.activeCharacter = null;
      window.level = this;
      $(function() {
        _this.initCharacters();
        _this.win = $(window);
        _this.dialog = $('#dialog');
        _this.stage = $('#stage');
        _this.info = $('#info');
        _this.console = $('#console');
        _this.bindWindowResize();
        _this.win.trigger('resize');
        _this.initAnimationQueue();
        _this.initAnimationSlider();
        return _this.initLogging();
      });
    }

    Level.prototype.initAnimationSlider = function() {
      var refreshSlider, slider,
        _this = this;
      slider = $('#slider');
      refreshSlider = function() {
        _this.animationInterval = 315 - Number(slider.slider('value'));
        return _this.initAnimationQueue();
      };
      return slider.slider({
        orientation: "horizontal",
        min: 15,
        max: 300,
        value: 315 - this.animationInterval,
        slide: refreshSlider,
        change: refreshSlider
      });
    };

    Level.prototype.initLogging = function() {
      var previousHeight;
      previousHeight = 80;
      return level.log = function() {
        var li, msg;
        msg = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        li = $("<li> " + msg + " </li>");
        return level.console.append(li).scrollTop(previousHeight += li.height() + 10);
      };
    };

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
      var arrayToAddTo;
      arrayToAddTo = obj.isTypeOf('Player') ? this.players : obj.isTypeOf('Enemy') ? this.enemies : [];
      if (!_(arrayToAddTo).include(obj)) arrayToAddTo.push(obj);
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
      if (this.previousInterval) clearInterval(this.previousInterval);
      return this.previousInterval = setInterval((function() {
        if (_this.anim[0]) return _this.nextTick();
      }), this.animationInterval);
    };

    Level.prototype.queue = function(delayOrFn) {
      if (delayOrFn == null) delayOrFn = 0;
      if (this.anim[0] !== delayOrFn) this.anim.push(delayOrFn);
      return this;
    };

    Level.prototype.nextTick = function() {
      if (typeof this.anim[0] === 'number') {
        this.anim[0] -= 1;
        if (this.anim[0] <= 0) return this.anim.shift();
      } else if (typeof this.anim[0] === 'function') {
        while (typeof this.anim[0] === 'function') {
          this.anim.shift()();
        }
        if (typeof this.anim[0] === 'number') return this.anim[0] -= 1;
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
      var _this = this;
      level.log('You have fallen in battle');
      return this.showDialog('You have fallen in battle', function() {
        return $('body').fadeOut(2000, function() {
          level.map.wrapper.html(level.map.template);
          return $.getScript("/javascripts/levels/" + _this.number + ".js", function() {
            return $('body').fadeIn(2000);
          });
        });
      });
    };

    Level.prototype.next = function() {
      var _this = this;
      level.log('You win!');
      return this.showDialog('You win!', function() {
        return $('body').fadeOut(2000, function() {
          level.map.wrapper.html(level.map.template);
          return $.getScript("/javascripts/levels/" + (_this.number + 1) + ".js", function() {
            $.cookie('lastLevel', _this.number + 1);
            return $('body').fadeIn(2000);
          });
        });
      });
    };

    Level.prototype.startNextCharacter = function() {
      var nextChar,
        _this = this;
      this.anim = [];
      nextChar = _(this.players.concat(this.enemies)).filter(function(char) {
        return !char.hasGone;
      })[0];
      if (nextChar != null) {
        return nextChar.startTurn();
      } else {
        return this.queue(function() {
          _this.turnStart();
          _this.turnFunction(_this.turnNum += 1);
          _this.restoreCharacters();
          return _this.startNextCharacter();
        });
      }
    };

    Level.prototype.restoreCharacters = function() {
      return _(this.players.concat(this.enemies)).each(function(char) {
        char.hasGone = false;
        return char.addAp(char.ap);
      });
    };

    Level.prototype.showDialog = function(msg, closeFunction) {
      if (closeFunction == null) closeFunction = function() {};
      this.dialog.html(msg);
      return $('#dialog').dialog({
        modal: true,
        close: closeFunction,
        buttons: {
          Done: function() {
            return $(this).dialog("close");
          }
        }
      });
    };

    return Level;

  })();

}).call(this);
