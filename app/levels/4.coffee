p1 = new Player 
  x: 3, y: 3, name: 'D00D'
  # isBot: true
  level: 1

p2 = new Player 
  x: 4, y: 3, name: 'Lady'
  sprite: '/images/girl.gif'
  # isBot: true
  level: 1
  weapon: new Weapon 
    range: 3

# window.p3 = new Engineer
#   x: 4, y: 5, name: 'Ace'
#   strength: 5
#   sprite: '/images/golem.gif'
#   level: 1
#   weapon: new Weapon

e1 = new Enemy 
  x: 0, y: 0, 
  name: 'Turtle Man' 
  sprite: '/images/turtle-man.gif'
  level:1

e2 = new Enemy 
  x: 0, y: 1
  name: 'Ninja'
  sprite: '/images/ninja.gif'
  level: 1

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
  players: [p1, p2]
  enemies: [e1, e2]
  animationInterval: 30
  
level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  
  
  $('.cell').css('border', 'none')
  $('.cell.overlay').css('border-right', 'thin solid gray').css('border-bottom', 'thin solid gray')
  level.map.mapMatrix.each -> 
    $(this).css
      'background-image': 'url("/images/tileset.png")'
      'background-size': '1600px'
      'background-position-x': '0px'
      'background-position-y': '9350px'
      
  level.start()