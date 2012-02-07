class window.Player extends Character
  distributeExperience: -> _(level.enemies).each (enemy) => enemy.addExp @exp
  
  addedToLevel: ->
    @drawInfo()
    @initSprite()
    @trigger 'create'
  
  startTurn: ->
    level.queue(=> @characterSelected()).queue(=> @act()) if @isBot
  
  act: ->
    level.queue =>
      if target = @findTarget()
        return unless target
        distanceToTarget = @chebyshevDistance target.x, target.y
        if distanceToTarget <= @weapon.range
          @attack target.x, target.y
        else
          @moveTo target.x, target.y
    level.queue =>
      if @apLeft > 1 then @act() else @endTurn()
  
  findTarget: ->
    weakestEnemy = level.enemies[0]
    for enemy in level.enemies
      weakestEnemy = enemy if enemy.hpLeft < weakestEnemy.hpLeft
    weakestEnemy
  
  # specialMove: (chancePct, cb) ->
  