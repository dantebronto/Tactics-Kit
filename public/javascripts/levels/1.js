/* DO NOT MODIFY. This file was compiled Wed, 30 May 2012 00:58:55 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/levels/1.coffee
 */

(function() {
  var e1, e2, level, p1, p2, terrain,
    _this = this;

  p1 = new RPG.Player({
    x: 3,
    y: 1,
    name: 'Soldier',
    sprite: '/images/sprites/player/paladin.gif',
    strength: 3,
    level: 1,
    hp: 75,
    weapon: new RPG.Weapon({
      attack: 1
    })
  });

  p2 = new RPG.Player({
    x: 4,
    y: 1,
    name: 'Gunner',
    sprite: '/images/sprites/monsters/mercenary.gif',
    level: 1,
    accuracy: 90,
    weapon: new RPG.Weapon({
      range: 3
    })
  });

  e1 = new RPG.Enemy({
    x: 4,
    y: 8,
    name: 'Turtle Man',
    sprite: '/images/turtle-man.gif',
    level: 1
  });

  e2 = new RPG.Enemy({
    x: 3,
    y: 8,
    name: 'Ninja',
    sprite: '/images/ninja.gif',
    level: 1
  });

  terrain = [[15, 15, 15, 15, 15, 15, 15, 15], [15, 15, 15, 10, 10, 15, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 15, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 10, 10, 10, 10, 15, 15], [15, 15, 15, 15, 15, 15, 15, 15]];

  level = new RPG.Level({
    map: {
      terrain: terrain,
      width: 400,
      height: 500,
      backgroundImage: '/images/test-map.jpg',
      selector: '#map'
    },
    number: 1,
    players: [p1, p2],
    enemies: [e1, e2]
  });

  level.queue(function() {
    p1.addDefaultSpecials();
    p2.addDefaultSpecials();
    level.showDialog("    <h1>Welcome to the game!</h1>    <h3>Level 1, Basic Gameplay:</h3>    <p>Green squares can be walked on, red squares are spaces you can attack.<p>    <p>Your soldier can attack enemies that are within one space, while the gunner can attack up to 3 squares away.<p>    <p>You have a limited amount of action points (ap) to use per turn. Each time you attack or move, it will cost you 1 ap.<p>    <p>Enjoy!<p>  ");
    level.map.terrainMatrix.each(function(x, y) {
      var num;
      num = Number(this);
      level.map.mapMatrix.get(x, y).addClass('grass');
      if (num === 15) return level.map.itemMatrix.get(x, y).addClass('shrub');
    });
    return level.start();
  });

}).call(this);
