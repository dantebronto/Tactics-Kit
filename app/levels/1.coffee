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
  x: 4, y: 14, 
  name: 'Turtle Man' 
  sprite: '/images/turtle-man.gif'
  level:1

e2 = new Enemy 
  x: 3, y: 14
  name: 'Ninja'
  sprite: '/images/ninja.gif'
  level: 1

# level 1
terrain = [ 
  [ 15, 15, 15, 15, 15, 15, 15, 15 ],
  [ 15, 15, 15, 15, 15, 15, 15, 15 ],
  [ 15, 15, 15, 15, 15, 15, 15, 15 ],
  [ 15, 15, 15, 10, 10, 15, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 15, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 10, 10, 10, 10, 15, 15 ],
  [ 15, 15, 15, 15, 15, 15, 15, 15 ]
]

level = new Level
  map:
    terrain: terrain
    width: 410
    height: 816
    backgroundImage: '/images/test-map.jpg'
    selector: '#map'
  players: [p1, p2]
  enemies: [e1, e2]
  animationInterval: 30

level.queue =>
  p1.addDefaultSpecials()
  p2.addDefaultSpecials()
  # p3.addDefaultSpecials()
  # Special.bindBomb(p2)
  level.start()