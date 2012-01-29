(function() {
  (function() {
    var terrain;
    terrain = [[15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 10, 10, 15, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 15, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15]];
    if (typeof Level != "undefined" && Level !== null) {
      window.p = new Player({
        x: 3,
        y: 3,
        name: 'd00d'
      });
      window.p2 = new Player({
        x: 4,
        y: 3,
        name: 'lady',
        sprite: '/images/girl.gif'
      });
      return window.level = new Level({
        map: {
          terrain: terrain,
          width: 410,
          height: 816,
          backgroundImage: '/images/test-map.jpg',
          selector: '#map'
        },
        players: [p, p2],
        enemies: []
      });
    }
  })();
}).call(this);
