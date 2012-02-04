/* DO NOT MODIFY. This file was compiled Fri, 03 Feb 2012 05:14:54 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/enemy.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Enemy = (function(_super) {

    __extends(Enemy, _super);

    function Enemy(opts) {
      Enemy.__super__.constructor.call(this, opts);
    }

    Enemy.prototype.addedToLevel = function() {
      this.drawInfo();
      this.initSprite();
      this.trigger('create');
      return this.info.find('button').hide();
    };

    return Enemy;

  })(Character);

}).call(this);
