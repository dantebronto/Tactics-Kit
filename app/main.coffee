# animation
# character
# enemy
# enemy.pathfinder
# weapon
# inventory
# menus.contextMenu
# menus.modalDialog

if Level? then do ->
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
  
  window.p1 = new Player 
    x: 3, y: 13, name: 'd00d'
  
  window.p2 = new Player 
    x: 4, y: 3, name: 'lady'
    strength: 20
    sprite: '/images/girl.gif'
    weapon: new Weapon 
      range: 15

  setInterval((-> p2.addAp(4)), 3000)
  
  window.e1 = new Enemy 
    x: 4, y: 14, 
    name: 'Turtle Man' 
    sprite: '/images/turtle-man.gif'
  
  window.e2 = new Enemy 
    x: 3, y: 14
    name: 'Ninja'
    sprite: '/images/ninja.gif'
  
  window.level = new Level
    map:
      terrain: terrain
      width: 410
      height: 816
      backgroundImage: '/images/test-map.jpg'
      selector: '#map'
    players: [p1, p2]
    enemies: [e1, e2]