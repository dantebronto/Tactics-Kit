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
  
  window.p = new Player x: 3, y: 3, name: 'd00d'
  window.p2 = new Player x: 4, y: 3, name: 'lady', sprite: '/images/girl.gif'
  
  window.level = new Level
    map:
      terrain: terrain
      width: 410
      height: 816
      backgroundImage: '/images/test-map.jpg'
      selector: '#map'
    players: [p, p2]
    enemies: []