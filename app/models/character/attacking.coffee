class window.Attacking
  
  initAttacking: ->
  
  showAttackableCells: ->
    return if @apLeft <= 0
    speed = @apLeft
    matrix = Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount, 0
    matrix = @findAttackableNeighbors(@x, @y, matrix, @weapon.range)
    matrix.set @x, @y, 0
    matrix.each (x, y) ->
      if Number(this) == 1
        level.clear(x, y)
        level.showCellAs('attackable', x, y)
    # if @weapon.isRanged
      # re-run find neighbors with a speed of @weapon.deadZone
      # matrix.each, mark as 0
    matrix
  
  findAttackableNeighbors: (x, y, matrix, range) ->
    matrix.each (x, y) =>
      matrix.set(x, y, 1) if level.canAttack(x, y) and @chebyshevDistance(x, y) <= range
    matrix
  
  chebyshevDistance: (x, y) -> _([ Math.abs(@x - x), Math.abs(@y - y) ]).max()
  
  attack: (x, y) ->
    return if @apLeft < 2
    @doDamage x, y
  
  doDamage: (x, y, dmg, apToSubtract) ->
    dmg ?= 0
    apToSubtract ?= 2
    if dmg == 0
      _(@strength + @weapon.attack).times => dmg += @rollDice()
      dmg = 'miss' if @didMiss()
    dmg = @beforeDoDamage(dmg)
    @animateDamage(x, y, dmg, apToSubtract)
    @afterDoDamage(dmg)
  
  animateDamage: (x, y, dmg, apToSubtract) ->
    hits = if dmg.length is 1 or dmg is 'miss'
      $ "<h6>#{dmg}</h6>"
    else if dmg.length is 2
     $ "<h5>#{dmg}</h5>"
    else if dmg.length >= 3
      dmg = Number dmg
      if dmg >= 750
        $ "<h1>#{dmg}</h1>"
      else if dmg >= 500
        $ "<h2>#{dmg}</h2>"
      else if dmg >= 250
       $ "<h3>#{dmg}</h3>"
     else
       $ "<h4>#{dmg}</h4>"
    
    level.queue(5) if @isBot
    level.queue => 
      return if @apLeft <= 0
      
      @subtractAp apToSubtract
      
      level.map.statMatrix.get(x, y).append(hits).show()
      character = Character.findByPosition(x, y)
      
      offset = (50 - hits.width())/2
      hits.css
        position: 'absolute' 
        left: "#{offset}px"
      
      unless dmg == 'miss'
        character?.subtractHp(Number(dmg))
        console.log "#{@name} attacks #{character?.name} and does #{dmg} damage"
        if character?.hpLeft == 0
          console.log "#{@name} dispatched #{character.name}"
      else
        console.log "#{@name} attacked #{character?.name} and missed"
      
      @characterSelected()
      
      shakeTime = if dmg == 'miss' then 0 else 180
      hits.
        css({top: -20}).
        show().
        shake(3, 3, shakeTime, (->), offset).
        animate({ top: 10 }).
        fadeOut 1000, => 
          hits.remove()
  
  didMiss: ->
    missPercent = Math.floor((Math.random()*100+1))
    missPercent > @accuracy
  
  rollDice: -> Math.floor((Math.random()*3+1))