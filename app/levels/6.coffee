# p1 = new RPG.Medic
#   x: 7, y: 3, name: 'Medic'
#   sprite: '/images/sprites/beings/medicalRobot.gif'
#   # isBot: true
#   level: 15

p2 = new RPG.Player
  x: 7, y: 1, name: 'Gunner'
  sprite: '/images/sprites/monsters/mercenary.gif'
  isBot: true
  level: 15
  weapon: new RPG.Weapon
    range: 3

p3 = new RPG.Engineer
  x: 7, y: 2, name: 'Engineer'
  sprite: '/images/sprites/player/cyborg.gif'
  isBot: true
  level: 15
  weapon: new RPG.Weapon

e1 = new RPG.Spawner
  x: 0, y: 4
  name: 'Spawner'
  sprite: '/images/sprites/player/druid.gif'
  level: 15

terrain = [ 
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
  [ 10, 10, 10, 15, 10, 10, 10, 10 ],
  [ 10, 10, 10, 15, 10, 10, 10, 10 ],
  [ 10, 10, 10, 15, 10, 10, 10, 10 ],
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
]

level = new RPG.Level
  map:
    terrain: terrain
    width: 400
    height: 250
    selector: '#map'
  players: [p2, p3]
  enemies: [e1]
  
level.queue =>
  # p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  p3.addDefaultSpecials()
  
  level.map.mapMatrix.each ->
    $(this).css 'background-image': 'url("/images/step9.png")'
  
  im = level.map.itemMatrix
  im.get(3,1).add(im.get(3,2)).add(im.get(3,3)).css('background', 'url(/images/rock1.png) no-repeat center')
  
  level.start()