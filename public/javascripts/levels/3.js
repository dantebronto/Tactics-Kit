/* DO NOT MODIFY. This file was compiled Wed, 30 May 2012 19:38:06 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/levels/3.coffee
 */

(function() {
  var e1, e2, e3, e4, level, p1, p2, p3, p4, terrain,
    _this = this;

  p1 = new RPG.Medic({
    x: 7,
    y: 2,
    name: 'Medic',
    sprite: '/images/sprites/beings/medicalRobot.gif',
    level: 1
  });

  p2 = new RPG.Player({
    x: 7,
    y: 1,
    name: 'Soldier',
    sprite: '/images/sprites/player/paladin.gif',
    isBot: true
  });

  p3 = new RPG.Player({
    x: 6,
    y: 2,
    name: 'Soldier',
    sprite: '/images/sprites/player/paladin.gif',
    isBot: true
  });

  p4 = new RPG.Player({
    x: 7,
    y: 3,
    name: 'Soldier',
    sprite: '/images/sprites/player/paladin.gif',
    isBot: true
  });

  e1 = new RPG.Enemy({
    x: 0,
    y: 1,
    name: 'Ninja',
    sprite: '/images/ninja.gif',
    level: 1
  });

  e2 = new RPG.Enemy({
    x: 0,
    y: 2,
    name: 'Ninja',
    sprite: '/images/ninja.gif',
    level: 1
  });

  e3 = new RPG.Enemy({
    x: 1,
    y: 2,
    name: 'Ninja',
    sprite: '/images/ninja.gif',
    level: 2
  });

  e4 = new RPG.Enemy({
    x: 0,
    y: 3,
    name: 'Ninja',
    sprite: '/images/ninja.gif',
    level: 2
  });

  terrain = [[10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10]];

  level = new RPG.Level({
    map: {
      terrain: terrain,
      width: 400,
      height: 250,
      selector: '#map'
    },
    number: 3,
    players: [p2, p3, p4, p1],
    enemies: [e1, e2, e3, e4]
  });

  level.queue(function() {
    p1.addDefaultSpecials();
    level.map.mapMatrix.each(function() {
      return $(this).css({
        'background-image': 'url("/images/step9.png")'
      });
    });
    return level.showDialog("    <h1>Level 3 - Meet the Medic</h1>    <p>In this level, your soldiers will auto-fight. You'll need to use the medic to keep them healed up. You can heal once per action point.</p>    <p>If you tell a medic to auto-fight, he will most likely move to the weakest character and attempt to heal them.</p>  ", function() {
      return level.start();
    });
  });

}).call(this);
