/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:05 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/main.coffee
 */

(function() {

  if (RPG.Level != null) {
    (function() {
      var ara, level;
      try {
        ara = window.location.search.split("=");
        level = ara[ara.length - 1];
        if (level === '') level = 1;
      } catch (ex) {
        console.log(ex);
      }
      if (isNaN(level)) level = $.cookie('lastLevel') || 1;
      return $.getScript("/javascripts/levels/" + level + ".js");
    })();
  }

}).call(this);
