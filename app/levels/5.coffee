p1 = new RPG.Medic
  x: 7, y: 3, name: 'Medic'
  sprite: '/images/sprites/beings/medicalRobot.gif'
  isBot: true
  level: 1

p2 = new RPG.Player
  x: 7, y: 1, name: 'Gunner'
  sprite: '/images/sprites/monsters/mercenary.gif'
  isBot: true
  level: 1
  weapon: new RPG.Weapon
    range: 3

p3 = new RPG.Engineer
  x: 7, y: 2, name: 'Engineer'
  strength: 5
  sprite: '/images/sprites/player/cyborg.gif'
  isBot: true
  level: 2
  weapon: new RPG.Weapon

e1 = new RPG.Enemy
  x: 0, y: 1,
  name: 'Dragon Man' 
  sprite: '/images/dragonMan.gif'
  level:1

e2 = new RPG.Enemy
  x: 0, y: 2
  name: 'Acid Dragon'
  sprite: '/images/acidDragon.gif'
  level: 1

e3 = new RPG.Enemy
  x: 0, y: 3,
  name: 'Dragon Man' 
  sprite: '/images/dragonMan.gif'
  level:1

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
  players: [p1, p2, p3]
  enemies: [e2, e1, e3]
  
level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  p3.addDefaultSpecials()
  
  level.map.mapMatrix.each ->
    $(this).css 'background-image': 'url("/images/step9.png")'
  
  im = level.map.itemMatrix
  im.get(3,1).add(im.get(3,2)).add(im.get(3,3)).css('background', 'url(/images/rock1.png) no-repeat center')
  
  level.start()