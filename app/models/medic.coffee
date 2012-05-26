class RPG.Medic extends RPG.Player
  
  performHealing: (x, y) ->
    level.queue =>
      healedAmt = Math.round(0.125 * @hp)
      hits = @createHits(healedAmt)
      hits.addClass('healing')
      level.map.statMatrix.get(x, y).append(hits).show()
      offset = (50 - hits.width())/2
      hits.css
        position: 'absolute' 
        left: "#{offset}px"
    
      return unless target = RPG.Character.findByPosition(x, y)
      @subtractAp 1
      target.addHp(Number(healedAmt))
      target.updateInfo()
      level.log "#{@name} <span>&#43;</span> #{if target == @ then 'self' else target.name} for #{healedAmt}"
    
      img = $('<img src="/images/burst.png" width="50" height="50" />')
      oo = level.map.overlayMatrix.get(@x,@y).offset()
      targoo = level.map.overlayMatrix.get(x,y).offset()
      img.appendTo(level.map.elem)
      img.css({position: 'absolute', top: oo.top, left: oo.left, width:50, height:50 }).
        animate { top: targoo.top, left: targoo.left }, level.animationInterval, 'swing', ->
          img.hide()
          hits.show()
          setTimeout((-> hits.remove()), level.animationInterval*4)
    level.queue(5)
  
  act: ->
    return if level.enemies.length == 0 or level.players.length == 0 # no one to fight
    if @apLeft <= 0 or level.turnNum == 1
      @endTurn()
      return
    
    # default action: heal if in range, otherwise move to target
    level.queue =>
      return if @apLeft <= 0
      origX = @x
      origY = @y
      
      sorted = _(level.players).sortBy (pl) -> pl.hpLeft / pl.hp
      sorted = _(sorted).select (pl) -> pl.hpLeft / pl.hp != 1
      target = sorted[0]
      
      distanceToTarget = if target then @chebyshevDistance(target.x, target.y) else Infinity
      if distanceToTarget <= 1
        @performHealing target.x, target.y
      else
        if distanceToTarget == Infinity
          RPG.Player::act.apply(@)
        else
          @moveTo target.x, target.y          
          level.queue =>
            @endTurn() if origX == @x and origY == @y # didn't move, somehow got blocked
      
    level.queue =>
      if @apLeft > 0 then @act() else @endTurn()
  
  addedToLevel: ->
    super()
    @medicSpecial = new RPG.Special
      character: @
      buttonText: 'heal'
      apCost: 1
      action: => @actionClicked()
  
  actionClicked: ->
    myX = @x
    myY = @y
    level.clear()
    level.map.underlayMatrix.each (x,y) ->
      inRange = _([ Math.abs(myX - x), Math.abs(myY - y) ]).max() < 2
      if inRange
        level.map.underlayMatrix.get(x,y)?.addClass 'healable'
    
    burstable = new RPG.Burstable
      type: 'healable'
      activated: (x,y) =>
        if level.map.underlayMatrix.get(x, y)?.hasClass 'healable'
          level.queue => 
            @performHealing(x, y)
            level.queue => 
               @actionClicked() if @apLeft > 0
            
    burstable.showArea()
    
    $('body').one 'click', (e) =>
      level.clear()
      level.activeCharacter?.characterSelected()