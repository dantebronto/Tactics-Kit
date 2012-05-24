class RPG.Enemy extends RPG.Character
  constructor: (opts) ->
    super(opts)
  
  addedToLevel: ->
    @drawInfo()
    @initSprite()
    @bindInfoClicked()
    @trigger 'create'
  
  bindInfoClicked: -> @info.bind 'click', => @centerMapOnMe()
  
  startTurn: ->
    super()
    level.queue(=> @characterSelected()).queue => @act()
  
  findTarget: ->
    sorted = _(level.players).sortBy (enemy) -> enemy.hpLeft
    target = sorted[0] # weakest enemy
    for enemy in sorted
      target = enemy if @chebyshevDistance(enemy.x, enemy.y) <= @weapon.range
    target
  
  specialMove: (chancePct, cb) ->
    if chancePct < 50
      level.queue =>
        console.log("#{@name} is so special!")
        @subtractAp(1)
  
  distributeExperience: -> _(level.players).each (player) => player.addExp @exp
  
  onLevelUp: ->