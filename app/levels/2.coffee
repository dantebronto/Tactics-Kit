p1 = new Player 
  x: 2, y: 3, name: 'd00d'
  level: 10

p2 = new Player 
  x: 6, y: 4, name: 'lady'
  strength: 20
  sprite: '/images/girl.gif'
  level: 10
  weapon: new Weapon 
    range: 3

p3 = new Wolf
  x:3, y: 7
  name: 'Insanity Wolf'
  level: 2

e1 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 11, y: 1
  level: 5

e2 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 6, y: 7
  level: 5

e3 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 6, y: 6
  level: 5
  
e4 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 7, y: 6
  level: 5
  
e5 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 11, y: 6
  level: 5
  
e6 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 11, y: 5
  level: 5
  
# level 1
terrain = [ 
  [ 10, 10, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15 ]
  [ 10, 15, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10 ]
  [ 10, 10, 15, 15, 10, 10, 10, 15, 10, 10, 10, 10 ]
  [ 15, 10, 10, 15, 15, 15, 10, 15, 10, 10, 10, 10 ]
  [ 10, 10, 10, 10, 15, 15, 10, 15, 10, 10, 10, 15 ]
  [ 10, 10, 10, 15, 15, 15, 15, 15, 10, 10, 10, 10 ]
  [ 10, 10, 10, 15, 15, 10, 10, 10, 10, 10, 10, 10 ]
  [ 15, 15, 10, 10, 15, 10, 10, 10, 10, 15, 15, 10 ]
  [ 15, 15, 15, 15, 10, 10, 10, 10, 15, 15, 15, 15 ]
]

window.level = new Level
  map:
    terrain: terrain
    width: 612
    height: 458
    backgroundImage: '/images/valley.jpg'
    selector: '#map'
  players: [p1, p2, p3]
  enemies: [e1, e2, e3, e4, e5, e6]
  animationInterval: 200
  
level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  Special.bindBomb(p2)
  level.start()