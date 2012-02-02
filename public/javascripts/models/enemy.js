/* DO NOT MODIFY. This file was compiled Thu, 02 Feb 2012 02:38:06 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/enemy.coffee
 */

(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.Enemy = (function() {
    __extends(Enemy, Character);
    function Enemy(opts) {
      Enemy.__super__.constructor.call(this, opts);
    }
    Enemy.prototype.addedToLevel = function() {
      Enemy.__super__.addedToLevel.call(this);
      return this.info.find('button').hide();
    };
    return Enemy;
  })();
}).call(this);
