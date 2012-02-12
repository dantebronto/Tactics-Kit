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
    for enemy in sorted
      target = enemy if @chebyshevDistance(enemy.x, enemy.y) <= @weapon.range
    target
  
  # specialMove: (chancePct, cb) ->
  