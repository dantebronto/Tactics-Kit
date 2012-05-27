p1 = new RPG.Player 
  x: 8, y: 1, name: 'Fighter'
  # isBot: true
  level: 10

p2 = new RPG.Player 
  x: 9, y: 1, name: 'Gunner'
  strength: 20
  sprite: '/images/sprites/monsters/mercenary.gif'
  # isBot: true
  level: 10
  weapon: new RPG.Weapon 
    range: 3

p3 = new RPG.Engineer
  x: 10, y: 1
  name: 'Engineer'
  level: 5
  # isBot: true
  sprite: '/images/sprites/player/cyborg.gif'

p4 = new RPG.Medic
  x: 11, y: 1, name: 'Medic'
  sprite: '/images/sprites/beings/medicalRobot.gif'
  # isBot: true
  level: 5

e1 = new RPG.Spawner
  x: 9, y: 19
  name: 'Spawner'
  level: 4
  sprite: '/images/sprites/player/druid.gif'

e2 = new RPG.Spawner
  x: 8, y: 8
  name: 'Spawner'
  level: 4
  sprite: '/images/sprites/player/druid.gif'

e3 = new RPG.Spawner
  x: 2, y: 2
  name: 'Spawner'
  level: 4
  sprite: '/images/sprites/player/druid.gif'

e4 = new RPG.Spawner
  x: 17, y: 2
  name: 'Spawner'
  level: 4
  sprite: '/images/sprites/player/druid.gif'

# level 1
terrain = [                                                                            
  #  0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19
  [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15] # 0
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 15] # 1
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 15] # 2
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 15] # 3
  [ 15, 10, 10, 10, 10, 10, 10, 15, 15, 10, 10, 15, 15, 10, 10, 10, 10, 10, 10, 15] # 4
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] # 5
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] # 6
  [ 15, 15, 15, 15, 15, 15, 10, 15, 15, 15, 15, 15, 10, 15, 15, 15, 15, 15, 15, 15] #15
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 15] #16
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 15] #20
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 15, 15, 15, 15, 10, 10, 10, 10, 10, 10, 15] #24
  [ 15, 10, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #25
  [ 15, 10, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #26
  [ 15, 10, 10, 10, 10, 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #27
  [ 15, 15, 15, 15, 10, 15, 15, 15, 15, 10, 15, 15, 15, 15, 10, 15, 15, 15, 15, 15] #28
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #29
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #30
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #31
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #32
  [ 15, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 15] #36
  [ 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15] #37
]

level = new RPG.Level
  map:
    terrain: terrain
    width: 1000
    height: 1050
    selector: '#map'
  players: [p1, p2, p3, p4]
  enemies: [e1, e2, e3, e4]

level.queue =>
  p1.addDefaultSpecials()
  RPG.Special.bindBomb(p1)
  p2.addDefaultSpecials()
  p3.addDefaultSpecials()
  p4.addDefaultSpecials()

level.queue(5).queue => 
  level.map.terrainMatrix.each (x, y) ->
    num = Number(this)
    level.map.mapMatrix.get(x, y).css('background', 'url(/images/grass.jpg) no-repeat center')
    if num == 15
      level.map.itemMatrix.get(x, y).css('background', 'url(/images/shrub.png) no-repeat center')
  
  level.start()