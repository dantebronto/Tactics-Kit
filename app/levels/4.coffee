p2 = new Player 
  x: 7, y: 2, name: 'Gorg'
  sprite: '/images/sprites/monsters/mercenary.gif'
  # isBot: true
  level: 1
  weapon: new Weapon 
    range: 3

p3 = new Engineer
  x: 7, y: 3, name: 'Ace'
  strength: 5
  sprite: '/images/sprites/player/cyborg.gif'
  # isBot: true
  level: 1
  weapon: new Weapon

e1 = new Enemy 
  x: 0, y: 1, 
  name: 'Dragon Man' 
  sprite: '/images/dragonMan.gif'
  level:1

e2 = new Enemy 
  x: 0, y: 2
  name: 'Acid Dragon'
  sprite: '/images/acidDragon.gif'
  level: 13

e3 = new Enemy 
  x: 0, y: 3, 
  name: 'Dragon Man' 
  sprite: '/images/dragonMan.gif'
  level:1

# level 4
terrain = [ 
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
  [ 10, 10, 10, 10, 10, 10, 10, 10 ],
]

level = new Level
  map:
    terrain: terrain
    width: 400
    height: 250
    selector: '#map'
  players: [p2, p3]
  enemies: [e2, e1, e3]
  animationInterval: 150
  
level.queue =>
  p2.addDefaultSpecials()
  p3.addDefaultSpecials()
  
  level.map.mapMatrix.each -> 
    $(this).css 'background-image': 'url("/images/BrickWall.jpg")'
    
  # level.map.mapMatrix.each -> 
  #   $(this).css
  #     'background-image': '/images/sprites/tiles.png'
  #     # 'background-size': '50px'
  #     'width': '50px'
  #     'height': '50px'
  #   .addClass('sprites tiles-water')
  
  level.start()