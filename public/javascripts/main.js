/* DO NOT MODIFY. This file was compiled Thu, 26 Jan 2012 04:21:37 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/main.coffee
 */

(function() {
  (function() {
    var terrain;
    terrain = [[15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 10, 10, 15, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 15, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15]];
    if (typeof Level !== "undefined" && Level !== null) {
      window.level = new Level({
        map: {
          terrain: terrain,
          width: 410,
          height: 816,
          backgroundImage: '/images/test-map.jpg',
          selector: '#map'
        }
      });
      return new Player({
        x: 3,
        y: 3,
        onCreate: function() {
          return alert('crake');
        }
      });
    }
  })();
}).call(this);
