window.p1 = new Player 
  x: 3, y: 3, name: 'd00d'
  isBot: true
  level: 10

window.p2 = new Player 
  x: 6, y: 4, name: 'lady'
  strength: 20
  sprite: '/images/girl.gif'
  # isBot: true
  level: 10
  weapon: new Weapon 
    range: 3

window.e1 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 11, y: 1
  level: 5

window.e2 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 6, y: 7
  level: 5

window.e3 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 6, y: 6
  level: 5
  
window.e4 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 7, y: 6
  level: 5
  
window.e5 = new Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck'
  x: 11, y: 6
  level: 5
  
window.e6 = new Enemy
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
  players: [p1, p2]
  enemies: [e1, e2, e3, e4, e5, e6]
  animationInterval: 150
  
level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  Special.bindBomb(p2)
  level.start()