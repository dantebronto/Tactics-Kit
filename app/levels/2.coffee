p1 = new RPG.Player 
  x: 3, y: 6, name: 'Soldier'
  sprite: '/images/sprites/player/paladin.gif'
  strength: 3
  # isBot: true
  level: 1
  hp: 75
  weapon: new RPG.Weapon
    attack: 1

p2 = new RPG.Player 
  x: 6, y: 4, name: 'Gunner'
  sprite: '/images/sprites/monsters/mercenary.gif'
  # isBot: true
  level: 1
  accuracy: 90
  weapon: new RPG.Weapon 
    range: 3

p3 = new RPG.Wolf
  x:3, y: 7
  name: 'Insanity Wolf'
  # isBot: true
  strength: 7
  accuracy: 70
  level: 1

e1 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 1'
  x: 11, y: 1
  level: 2

e2 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 2'
  x: 6, y: 7
  level: 2

e3 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 3'
  x: 6, y: 6
  level: 1
  
e4 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 4'
  x: 7, y: 6
  level: 1
  
e5 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 5'
  x: 11, y: 6
  level: 1
  
e6 = new RPG.Enemy
  sprite: '/images/penguin2.gif'
  name: 'Robo Duck 6'
  x: 4, y: 8
  level: 1
  
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
  number: 2
  players: [p1, p2, p3]
  enemies: [e1, e2, e3, e4, e5, e6]
  
level.queue =>
  p1.addDefaultSpecials()
  RPG.Special.bindBomb(p1)
  p2.addDefaultSpecials()
  
  level.map.terrainMatrix.each (x, y) ->
    num = Number(this)
    level.map.mapMatrix.get(x, y).addClass('grass')
    if num == 15
      level.map.itemMatrix.get(x, y).addClass('shrub')
  
  level.showDialog "
    <h1>Level 2</h1>
    <p>Welcome to the second level! There are two new concepts here:</p>
    <p><b>1.</b> From time to time it becomes possible to control wild beasts. The wolf knows two commands. You can't directly control him, but you can tell him to stay put or attack. If you check the auto box, he will automatically attack every turn.<p>
    <p><b>2.</b> Your soldier now has bombs! They provide a larger area of attack, so wait until enemies are grouped together to get the biggest effect.<p>
    <p>Good luck!</p>
  "
  
  level.start()