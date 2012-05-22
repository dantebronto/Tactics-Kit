p1 = new Player 
  x: 7, y: 1, name: 'D00D'
  isBot: true
  level: 1

p2 = new Player 
  x: 7, y: 2, name: 'Lady'
  sprite: '/images/girl.gif'
  isBot: true
  level: 1
  weapon: new Weapon 
    range: 3

p3 = new Engineer
  x: 7, y: 3, name: 'Ace'
  strength: 5
  sprite: '/images/golem.gif'
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
  players: [p1, p2, p3]
  enemies: [e1, e2]
  animationInterval: 30
  
level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  
  p3.addDefaultSpecials()
  
  bord = 'thin solid gray'
  $('.cell').css('border', 'none') #.find('.overlay').css
    # 'border-right': bord
    # 'border-bottom': bord
  
  level.map.mapMatrix.each -> 
    $(this).css 'background-image': 'url("/images/tiletest.png")'
  
  level.start()