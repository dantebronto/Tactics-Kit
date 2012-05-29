/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:08 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/character/special.coffee
 */

(function() {

  RPG.Special = (function() {

    function Special(opts) {
      if (opts == null) opts = {};
      this.apCost = opts.apCost || 2;
      this.character = (function() {
        if (opts.character) {
          return opts.character;
        } else {
          throw 'no character provided!';
        }
      })();
      this.character.specials.push(this);
      this.action = opts.action || function() {};
      this.buttonText = opts.buttonText;
      this.disabled = false;
      if (this.buttonText) this.bindButtonClicked();
      this.character.updateInfo();
    }

    Special.prototype.bindButtonClicked = function() {
      var _this = this;
      return this.character.info.on('click', "." + this.buttonText, function(e) {
        _this.character.characterSelected();
        level.activeCharacter = _this.character;
        level.clear();
        _this.action.call(_this);
        return e.stopPropagation();
      });
    };

    Special.prototype.button = function() {
      var disabled;
      if (!this.buttonText || this.character.isBot) return '';
      disabled = (this.apCost > this.character.apLeft) || this.disabled ? 'disabled' : '';
      return "<button class='" + this.buttonText + "' " + disabled + " type='button'>" + this.buttonText + "</button>";
    };

    Special.bindAuto = function(char, buttonText) {
      var _this = this;
      if (buttonText == null) buttonText = 'auto';
      if (char.isBot) return;
      return new Special({
        character: char,
        buttonText: buttonText,
        action: function() {
          return char.startTurn(true);
        }
      });
    };

    Special.bindGuard = function(char, buttonText) {
      var _this = this;
      if (buttonText == null) buttonText = 'guard';
      if (char.isBot) return;
      return new Special({
        apCost: 1,
        character: char,
        buttonText: buttonText,
        action: function() {
          level.log("" + char.name + " is guarding");
          return char.subtractAp(char.apLeft);
        }
      });
    };

    Special.bindBomb = function(char) {
      var _this = this;
      return new Special({
        apCost: 2,
        character: char,
        buttonText: 'bomb',
        action: function() {
          return (new RPG.Burstable({
            activated: function(x, y) {
              var used;
              used = [];
              level.map.elem.find('span.attackable').each(function(el) {
                var elx, ely, _ref;
                _ref = $(this).getMatrixCoords(), elx = _ref[0], ely = _ref[1];
                if (RPG.Character.findByPosition(elx, ely)) {
                  return used.push({
                    x: elx,
                    y: ely
                  });
                }
              });
              if (used.length > 0) {
                return level.queue(function() {
                  return _(used).each(function(point, index) {
                    var ex;
                    ex = $("<img src='/images/explosion.png'/>");
                    ex.css({
                      width: '0px',
                      height: '0px',
                      position: 'absolute',
                      left: 25,
                      top: 25
                    });
                    level.map.statMatrix.get(point.x, point.y).prepend(ex);
                    return ex.animate({
                      width: '+=50',
                      height: '+=50',
                      left: 0,
                      top: 0
                    }, 50, function() {
                      return char.doDamage(point.x, point.y, 0, 0, true);
                    }).shake(3, 3, 200).fadeOut(200, function() {
                      ex.remove();
                      if (index === used.length - 1) {
                        return level.queue(function() {
                          char.subtractAp(2);
                          return char.characterSelected();
                        });
                      }
                    });
                  });
                });
              }
            },
            onHover: function(x, y) {
              var cell, um, _i, _len, _ref, _results;
              um = level.map.underlayMatrix;
              _ref = [um.get(x, y), um.get(x - 1, y), um.get(x + 1, y), um.get(x, y + 1), um.get(x, y - 1)];
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                cell = _ref[_i];
                _results.push(cell != null ? cell.addClass('attackable') : void 0);
              }
              return _results;
            }
          })).showArea();
        }
      });
    };

    return Special;

  })();

}).call(this);
