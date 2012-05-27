class RPG.Enemy extends RPG.Character
  constructor: (opts) ->
    super(opts)
  
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
  
  distributeExperience: -> _(level.players).each (player) => player.addExp @exp
  
  onLevelUp: ->