class window.Enemy extends Character
  constructor: (opts) ->
    super(opts)
  
  addedToLevel: ->
    @drawInfo()
    @initSprite()
    @trigger 'create'
  
  startTurn: ->
    super()
    level.queue(=> @characterSelected()).queue => @act()
  
  act: ->
    level.queue(=>
      target = @findTarget()
      return unless target
      distanceToTarget = @chebyshevDistance target.x, target.y
      if distanceToTarget <= @weapon.range
        @attack target.x, target.y
      else
        @moveTo target.x, target.y
    ).queue =>
      if @apLeft > 1 then @act() else @endTurn()
  
  findTarget: ->
    weakestPlayer = level.players[0]
    for player in level.players
      weakestPlayer = player if player.hpLeft < weakestPlayer.hpLeft
    weakestPlayer
  
  specialMove: (chancePct, cb) ->
    
  distributeExperience: -> _(level.players).each (player) => player.addExp @exp