p1 = new RPG.Player 
  x: 3, y: 6, name: 'd00d'
  level: 10

p2 = new RPG.Player 
  x: 6, y: 4, name: 'lady'
  strength: 20
  sprite: '/images/girl.gif'
  level: 10
  weapon: new RPG.Weapon 
    range: 3

p3 = new RPG.Wolf
  x:3, y: 7
  name: 'Insanity Wolf'
  level: 2

e1 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 1'
  x: 11, y: 1
  level: 5
  ap: 4

e2 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 2'
  x: 6, y: 7
  level: 5
  ap: 4

e3 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 3'
  x: 6, y: 6
  level: 5
  ap: 4
  
e4 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 4'
  x: 7, y: 6
  level: 5
  ap: 4
  
e5 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 5'
  x: 11, y: 6
  level: 5
  ap: 4
  
e6 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 6'
  x: 4, y: 8
  level: 5
  ap: 4
  
# level 1
terrain = [ 
  [ 10, 10, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15 ]
  [ 10, 15, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10 ]
  [ 10, 10, 15, 15, 10, 10, 10, 15, 10, 10, 10, 10 ]
  [ 15, 10, 10, 15, 15, 15, 10, 15, 10, 10, 10, 10 ]
  [ 10, 10, 10, 10, 15, 15, 10, 15, 10, 10, 10, 15 ]
  [ 10, 10, 10, 15, 15, 15, 15, 15, 10, 10, 10, 10 ]
  [ 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10 ]
  [ 15, 15, 10, 10, 10, 10, 10, 10, 10, 15, 15, 10 ]
  [ 15, 15, 15, 15, 10, 10, 10, 10, 15, 15, 15, 15 ]
]

level = new RPG.Level
  map:
    terrain: terrain
    width: 600
    height: 450
    backgroundImage: '/images/valley.jpg'
    selector: '#map'
  players: [p1, p2, p3]
  enemies: [e1, e2, e3, e4, e5, e6]
  
level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  RPG.Special.bindBomb(p2)
  
  level.map.terrainMatrix.each (x, y) ->
    num = Number(this)
    level.map.mapMatrix.get(x, y).css('background', 'url(/images/grass.jpg) no-repeat center')
    if num == 15
      level.map.itemMatrix.get(x, y).css('background', 'url(/images/shrub.png) no-repeat center')
  
  level.start()