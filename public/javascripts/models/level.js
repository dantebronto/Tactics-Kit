/* DO NOT MODIFY. This file was compiled Sat, 21 Jan 2012 19:46:37 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/level.coffee
 */

(function() {

  window.Level = (function() {

    function Level(opts) {
      console.log('contructor called for level!!!');
      this.map = new Level.Map(opts.map);
      console.log('no err!');
    }

    return Level;

  })();

}).call(this);
