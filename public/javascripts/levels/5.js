/* DO NOT MODIFY. This file was compiled Wed, 30 May 2012 19:38:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/levels/5.coffee
 */

(function() {
  var e1, e2, e3, e4, level, p1, p2, p3, p4, p5, terrain,
    _this = this;

  p1 = new RPG.Player({
    x: 8,
    y: 1,
    name: 'Soldier',
    sprite: '/images/sprites/player/paladin.gif',
    level: 5
  });

  p2 = new RPG.Player({
    x: 9,
    y: 1,
    name: 'Gunner',
    sprite: '/images/sprites/monsters/mercenary.gif',
    level: 5,
    weapon: new RPG.Weapon({
      range: 3
    })
  });

  p3 = new RPG.Engineer({
    x: 10,
    y: 1,
    name: 'Engineer',
    level: 5,
    sprite: '/images/sprites/player/cyborg.gif'
  });

  p4 = new RPG.Medic({
    x: 11,
    y: 1,
    name: 'Medic',
    sprite: '/images/sprites/beings/medicalRobot.gif',
    level: 5
  });

  p5 = new RPG.Wolf({
    x: 10,
    y: 2,
    name: 'Insanity Wolf',
    level: 5
  });

  e1 = new RPG.Spawner({
    x: 9,
    y: 19,
    name: 'Spawner',
    level: 4,
    sprite: '/images/sprites/player/druid.gif'
  });

  e2 = new RPG.Spawner({
    x: 8,
    y: 8,
    name: 'Spawner',
    level: 4,
    sprite: '/images/sprites/player/druid.gif'
  });

  e3 = new RPG.Spawner({
    x: 2,
    y: 2,
    name: 'Spawner',
    level: 4,
    sprite: '/images/sprites/player/druid.gif'
  });

  e4 = new RPG.Spawner({
    x: 17,
    y: 2,
    name: 'Spawner',
    level: 4,
    sprite: '/images/sprites/player/druid.gif'
  });

  terrain = [[15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 15, 15, 10, 10, 15, 15, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 15, 15, 15, 15, 15, 10, 15, 15, 15, 15, 15, 10, 15, 15, 15, 15, 15, 15, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 15, 15, 15, 15, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 15, 15, 15, 10, 15, 15, 15, 15, 10, 15, 15, 15, 15, 10, 15, 15, 15, 15, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15], [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]];

  level = new RPG.Level({
    map: {
      terrain: terrain,
      width: 1000,
      height: 1050,
      selector: '#map'
    },
    number: 5,
    players: [p1, p2, p3, p4, p5],
    enemies: [e4, e3, e2, e1]
  });

  level.queue(function() {
    p1.addDefaultSpecials();
    RPG.Special.bindBomb(p1);
    p2.addDefaultSpecials();
    p3.addDefaultSpecials();
    return p4.addDefaultSpecials();
  });

  level.queue(5).queue(function() {
    level.map.terrainMatrix.each(function(x, y) {
      var num;
      num = Number(this);
      level.map.mapMatrix.get(x, y).addClass('grass');
      if (num === 15) return level.map.itemMatrix.get(x, y).addClass('shrub');
    });
    level.showDialog("    <h1>Putting it All Together</h1>    <p>You must now use your combined knowlege from the last few levels to beat this challenging scenario.</p>    <p>This map has enemies of the Spawner class, so you'll want to defeat them as soon as possible, to avoid being overrun.</p>  ");
    level.next = function() {
      return level.showDialog("      <h1>That's all for now</h1>      <p>If you like this game, check out the project on <a href='http://github.com'>Github</a>.</p>      <p>You can look at the source and easily add characters, enemies, and levels!</p>      <p>Thanks for playing!<p>    ");
    };
    return level.start();
  });

}).call(this);
