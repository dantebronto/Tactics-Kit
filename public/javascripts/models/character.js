/* DO NOT MODIFY. This file was compiled Thu, 26 Jan 2012 04:23:01 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Character = (function() {
    function Character(opts) {
      if (opts == null) {
        opts = {};
      }
      this.name = opts.name || 'Catan';
      this.inventory = opts.inventory || level.inventory;
      this.level = opts.level || 1;
      this.ap = opts.ap || Math.floor(4 + this.level * 0.07);
      this.apLeft = this.ap;
      this.hp = opts.hp || Math.floor(50.1 + this.level * 7.65);
      this.hpLeft = this.hp;
      this.speed = opts.speed || Math.floor(this.ap / 2);
      this.exp = opts.exp || 0;
      this.expNext = opts.expNext || Math.floor(this.hp * 1.3);
      this.sprite = opts.sprite || '/images/bar.gif';
      this.weapon = opts.weapon || new Weapon();
      this.accuracy = opts.accuracy || 80 + Math.floor(this.level * 0.19);
      this.strength = opts.strength || this.level;
      this.x = opts.x || 0;
      this.y = opts.y || 0;
      this.eventDispatch = $('');
      this.bind('onCreate', opts.onCreate || function() {});
      $(__bind(function() {
        level.add(this);
        return this.trigger('onCreate');
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
    return Character;
  })();
}).call(this);
