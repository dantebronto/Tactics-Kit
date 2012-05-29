/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/wolf.coffee
 */

(function() {
  var WolfSpecial,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  WolfSpecial = (function(_super) {

    __extends(WolfSpecial, _super);

    function WolfSpecial() {
      WolfSpecial.__super__.constructor.apply(this, arguments);
    }

    WolfSpecial.prototype.button = function() {
      var checked;
      checked = this.character.autoAttackChecked() ? "checked='checked'" : "";
      return "<span>auto</span>\n<input type='checkbox' class='auto-attack' " + checked + "/>\n" + (WolfSpecial.__super__.button.call(this));
    };

    return WolfSpecial;

  })(RPG.Special);

  RPG.Wolf = (function(_super) {

    __extends(Wolf, _super);

    function Wolf(opts) {
      Wolf.__super__.constructor.call(this, opts);
      this.sprite = opts.sprite || '/images/wolf.png';
      this.name = opts.name || 'Wolf';
    }

    Wolf.prototype.addedToLevel = function() {
      var _this = this;
      Wolf.__super__.addedToLevel.call(this);
      new WolfSpecial({
        character: this,
        buttonText: 'attack',
        action: function() {
          return _this.startTurn(true);
        }
      });
      RPG.Special.bindGuard(this, 'stay');
      this.showMovableCells = function() {};
      return this.showAttackableCells = function() {};
    };

    Wolf.prototype.autoAttackChecked = function() {
      return this.info.find('input.auto-attack').is(':checked');
    };

    Wolf.prototype.startTurn = function() {
      if (this.autoAttackChecked()) {
        return Wolf.__super__.startTurn.call(this, true);
      } else {
        return Wolf.__super__.startTurn.apply(this, arguments);
      }
    };

    return Wolf;

  })(RPG.Player);

}).call(this);
