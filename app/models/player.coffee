class window.Player extends Character
  
  addDefaultSpecials: ->
    Special.bindAuto @
    Special.bindGuard @
  
  distributeExperience: -> _(level.enemies).each (enemy) => enemy.addExp @exp
  
  startTurn: (oneTurnBot=false)->
    super(oneTurnBot)
    level.queue(=> @characterSelected()).queue(=> @act()) if @isBot or oneTurnBot
  
  findTarget: ->
    sorted = _(level.enemies).sortBy((enemy) -> enemy.hpLeft).reverse()
    target = sorted[0] # weakest enemy
    closest = { distance: 999, enemy: target }
    for enemy in sorted
      cdistance = @chebyshevDistance(enemy.x, enemy.y)
      if cdistance <= @weapon.range or cdistance < closest.distance
        closest = { distance: cdistance, enemy: enemy }
    target = closest.enemy
    target
  
  # specialMove: (chancePct, cb) ->
  