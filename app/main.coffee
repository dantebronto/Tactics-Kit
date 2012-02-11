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
    x: 3, y: 3, name: 'd00d'
    isBot: true
    level: 10
  
  window.p2 = new Player 
    x: 4, y: 3, name: 'lady'
    strength: 20
    sprite: '/images/girl.gif'
    isBot: true
    level: 10
    weapon: new Weapon 
      range: 3
  
  window.e1 = new Enemy 
    x: 4, y: 14, 
    name: 'Turtle Man' 
    sprite: '/images/turtle-man.gif'
    level:10
  
  window.e2 = new Enemy 
    x: 3, y: 14
    name: 'Ninja'
    sprite: '/images/ninja.gif'
    level: 14
  
  window.level = new Level
    map:
      terrain: terrain
      width: 410
      height: 816
      backgroundImage: '/images/test-map.jpg'
      selector: '#map'
    players: [p1, p2]
    enemies: [e1, e2]
    animationInterval: 200
  
  new Special
    character: p2
    buttonText: 'bomb'
    action: =>
      (new Burstable
        activated: (x,y) =>
          used = false
          level.map.underlayMatrix.each (x2, y2, el) =>
            if el.hasClass('attackable') and Character.findByPosition(x2, y2)
              used = true
              
              # animate here...
              
              p2.doDamage(x2, y2, 25, 0)
          if used 
            level.queue =>
              p2.subtractAp(2)
              p2.characterSelected()
        onHover: (x,y) ->
          um = level.map.underlayMatrix
          for cell in [ um.get(x, y), um.get(x-1,y), um.get(x+1, y), um.get(x, y+1), um.get(x, y-1) ]
            cell?.addClass 'attackable'
      ).showArea()