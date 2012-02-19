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

class WolfSpecial extends Special
  button: ->
    checked = if @character.autoAttackChecked() then "checked='checked'" else ""
    """
    <span>auto</span>
    <input type='checkbox' class='auto-attack' #{checked}/>
    #{super()}
    """

class Wolf extends Player
  constructor: (opts) -> 
    super opts
    @sprite = opts.sprite or '/images/wolf.png'
    @name = opts.name or 'Wolf'
  
  addedToLevel: ->
    super()
    
    new WolfSpecial
      character: @
      buttonText: 'attack'
      action: => @startTurn true
    
    Special.bindGuard @, 'stay'
    @showMovableCells = ->
    @showAttackableCells = ->
  
  autoAttackChecked: -> @info.find('input.auto-attack').is(':checked')
  startTurn: -> if @autoAttackChecked() then super(true) else super

window.p4 = new Wolf
  x:3, y: 7
  name: 'Insanity Wolf'
  level: 2

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
  players: [p3, p4]
  enemies: [e1, e2]
  animationInterval: 50

level.queue =>
  # p1.addDefaultSpecials()
  p3.addDefaultSpecials()
  
  # Special.bindBomb(p2)
  # p3.extendWith('Special.Engineering')
  
  level.start()