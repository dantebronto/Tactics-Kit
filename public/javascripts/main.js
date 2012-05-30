/* DO NOT MODIFY. This file was compiled Wed, 30 May 2012 21:32:59 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/main.coffee
 */

(function() {

  if (RPG.Level != null) {
    (function() {
      var ara, level;
      level = 1;
      try {
        ara = window.location.search.split("=");
        level = ara[ara.length - 1];
        if (level === '') level = $.cookie('lastLevel') || 1;
      } catch (ex) {
        console.log(ex);
      }
      return $.getScript("/javascripts/levels/" + level + ".js");
    })();
  }

}).call(this);
