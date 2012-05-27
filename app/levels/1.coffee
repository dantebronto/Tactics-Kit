p1 = new RPG.Player 
  x: 3, y: 1, name: 'Soldier'
  sprite: '/images/sprites/player/paladin.gif'
  # isBot: true
  level: 1

p2 = new RPG.Player 
  x: 4, y: 1, name: 'Gunner'
  sprite: '/images/sprites/monsters/mercenary.gif'
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
  number: 1
  players: [p1, p2]
  enemies: [e1, e2]

level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  
  level.showDialog "
    <h1>Welcome to the game!</h1>
    <h3>Level 1, Basic Gameplay:</h3>
    <p>Green squares can be walked on, red squares are spaces you can attack.<p>
    <p>Your soldier can attack enemies that are within one space, while the gunner can attack up to 3 squares away.<p>
    <p>You have a limited amount of action points (ap) to use per turn. Each time you attack or move, it will cost you 1 ap.<p>
    <p>Enjoy!<p>
  "
  
  level.map.terrainMatrix.each (x, y) ->
    num = Number(this)
    level.map.mapMatrix.get(x, y).addClass('grass')
    if num == 15
      level.map.itemMatrix.get(x, y).addClass('shrub')
  
  level.start()