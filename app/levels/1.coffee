window.p1 = new Player 
  x: 3, y: 3, name: 'D00D'
  isBot: true
  level: 10

window.p2 = new Player 
  x: 4, y: 3, name: 'Lady'
  strength: 20
  sprite: '/images/girl.gif'
  # isBot: true
  level: 10
  weapon: new Weapon 
    range: 3

class window.Engineer extends Player

window.p3 = new Engineer
  x: 4, y: 5, name: 'Ace'
  strength: 5
  sprite: '/images/golem.gif'
  level: 1
  weapon: new Weapon

window.e1 = new Enemy 
  x: 4, y: 14, 
  name: 'Turtle Man' 
  sprite: '/images/turtle-man.gif'
  level:1

window.e2 = new Enemy 
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

window.level = new Level
  map:
    terrain: terrain
    width: 410
    height: 816
    backgroundImage: '/images/test-map.jpg'
    selector: '#map'
  players: [p3]
  enemies: [e1, e2]
  animationInterval: 50

level.queue =>
  # p1.addDefaultSpecials()
  p3.addDefaultSpecials()
  # new Engineer(p3)
  
  turretCount = 0
  window.special = new Special
    character: p3
    buttonText: 'turret'
    apCost: 4
    action: =>
      if turretCount >= 2
        special.disabled = true
        return
      
      level.map.underlayMatrix.each (x,y) ->
        inRange = _([ Math.abs(p3.x - x), Math.abs(p3.y - y) ]).max() < 3
        if inRange and level.canMoveTo(x, y)
          level.map.underlayMatrix.get(x,y)?.addClass 'healable'
      
      (new Burstable
        type: 'healable'
        activated: (x,y) =>
          
          if level.canMoveTo(x,y)
            pz = new Player
              x: x, y: y, name: 'turret'
              ap: 2
              sprite: '/images/turret.png'
              isBot: true
              level: 1
              weapon: new Weapon
              onDeath: =>
                console.log 'death called (he said fuck you!)'
                turretCount -= 1
                turretCount = 0 if turretCount < 0
                special.disabled = false if turretCount < 2
            
            pz.moveTo = ->
            pz.showMovableCells = ->
            level.add pz
            p3.subtractAp 4
            turretCount += 1
            special.disabled = true if turretCount >= 2
        
        # onHover: (x,y) ->
        
      ).showArea()
      
      # modal = $ """
      # <div>
      #   <button id='build-turret'>Build Turret</button>
      # </div>
      # """
      # modal.find('#build-turret').bind 'click', ->
      
      $('body').one 'click', (e) =>
        level.clear()
        level.activeCharacter?.characterSelected()
      
      # modal.dialog()
  
  # Special.bindBomb(p2)
  
  # p3.extendWith('Special.Engineering')
  
  level.start()