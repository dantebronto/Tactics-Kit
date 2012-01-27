/* DO NOT MODIFY. This file was compiled Thu, 26 Jan 2012 18:33:23 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/templates.coffee
 */

(function() {
  var Templates;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Templates = (function() {
    function Templates() {
      $(__bind(function() {
        return this.characterInfo = _.template($('#character-info-template').html());
      }, this));
    }
    return Templates;
  })();
  window.TMPL = new Templates();
}).call(this);
