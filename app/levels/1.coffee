p1 = new RPG.Player 
  x: 3, y: 1, name: 'D00D'
  # isBot: true
  level: 1

p2 = new RPG.Player 
  x: 4, y: 1, name: 'Lady'
  sprite: '/images/girl.gif'
  # isBot: true
  level: 1
  weapon: new RPG.Weapon 
    range: 3

e1 = new RPG.Enemy 
  x: 4, y: 8, 
  name: 'Turtle Man' 
  sprite: '/images/turtle-man.gif'
  level:1

e2 = new RPG.Enemy 
  x: 3, y: 8
  name: 'Ninja'
  sprite: '/images/ninja.gif'
  level: 1

# level 1
terrain = [ 
  [ 15, 15, 15, 15, 15, 15, 15, 15 ],
  [ 15, 15, 15, 10, 10, 15, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 15, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 15, 15, 15, 15, 15, 15 ]
]

level = new RPG.Level
  map:
    terrain: terrain
    width: 400
    height: 500
    backgroundImage: '/images/test-map.jpg'
    selector: '#map'
  players: [p1, p2]
  enemies: [e1, e2]

level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  # p3.addDefaultSpecials()
  # Special.bindBomb(p2)
  level.map.terrainMatrix.each (x, y) ->
    num = Number(this)
    level.map.mapMatrix.get(x, y).css('background', 'url(/images/grass.jpg) no-repeat center')
    if num == 15
      level.map.itemMatrix.get(x, y).css('background', 'url(/images/shrub.png) no-repeat center')
      
  level.start()