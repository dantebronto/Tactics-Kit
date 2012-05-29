/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:05 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/levels/4.coffee
 */

(function() {
  var e1, e2, e3, level, p2, p3, terrain,
    _this = this;

  p2 = new RPG.Player({
    x: 7,
    y: 1,
    name: 'Gunner',
    sprite: '/images/sprites/monsters/mercenary.gif',
    level: 1,
    weapon: new RPG.Weapon({
      range: 3
    })
  });

  p3 = new RPG.Engineer({
    x: 7,
    y: 2,
    name: 'Engineer',
    strength: 5,
    sprite: '/images/sprites/player/cyborg.gif',
    level: 2,
    weapon: new RPG.Weapon
  });

  e1 = new RPG.Enemy({
    x: 0,
    y: 1,
    name: 'Dragon Man',
    sprite: '/images/dragonMan.gif',
    level: 1,
    weapon: new RPG.Weapon({
      range: 2
    })
  });

  e2 = new RPG.Enemy({
    x: 0,
    y: 2,
    name: 'Acid Dragon',
    sprite: '/images/acidDragon.gif',
    level: 13
  });

  e3 = new RPG.Enemy({
    x: 0,
    y: 3,
    name: 'Dragon Man',
    sprite: '/images/dragonMan.gif',
    level: 1,
    weapon: new RPG.Weapon({
      range: 2
    })
  });

  terrain = [[10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 15, 10, 10, 10, 10], [10, 10, 10, 15, 10, 10, 10, 10], [10, 10, 10, 15, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10]];

  level = new RPG.Level({
    map: {
      terrain: terrain,
      width: 400,
      height: 250,
      selector: '#map'
    },
    number: 4,
    players: [p2, p3],
    enemies: [e2, e1, e3]
  });

  level.queue(function() {
    var im;
    p2.addDefaultSpecials();
    p3.addDefaultSpecials();
    level.map.mapMatrix.each(function() {
      return $(this).css({
        'background-image': 'url("/images/step9.png")'
      });
    });
    im = level.map.itemMatrix;
    im.get(3, 1).add(im.get(3, 2)).add(im.get(3, 3)).css('background', 'url(/images/rock1.png) no-repeat center');
    level.showDialog("    <h1>Level 4 - Engineering</h1>    <p>The engineer can place turrets. A turret is pretty much like an ally that can't move, but will auto-fire if something moves within it's three square range.</p>    <p>Right now, you can only build one turret at a time. Turrets can not be removed. You can only build a new one when the other one dies, so choose your placement wisely.</p>    <p>Pro-tip: try to stay away from the dragon, he will destroy you.</p>  ");
    return level.start();
  });

}).call(this);
