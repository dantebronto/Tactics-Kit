class window.Attacking
  
  initAttacking: ->
  
  showAttackableCells: (preview=false) ->
    level.clear() if preview
    return if @apLeft <= 0
    speed = @apLeft
    matrix = Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount, 0
    matrix = @findAttackableNeighbors(@x, @y, matrix, @weapon.range, preview)
    matrix.set @x, @y, 0
    matrix.each (x, y) -> level.showCellAs('attackable', x, y) if Number(this) == 1
    matrix
  
  findAttackableNeighbors: (x, y, matrix, range, preview=false) ->
    matrix.each (x, y) =>
      inRange = @chebyshevDistance(x, y) <= range
      attackable = level.canAttack(x, y)
      matrix.set(x, y, 1) if (preview and inRange) or (inRange and attackable)
    matrix
  
  chebyshevDistance: (x, y) -> _([ Math.abs(@x - x), Math.abs(@y - y) ]).max()
  
  attack: (x, y) ->
    return if @apLeft < 1
    @doDamage x, y
  
  doDamage: (x, y, dmg, apToSubtract) ->
    dmg ?= 0
    apToSubtract ?= 1
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
        level.log "#{@name} attacks #{character?.name} and does #{dmg} damage"
        if character?.hpLeft == 0
          level.log "#{@name} dispatched #{character.name}"
      else
        level.log "#{@name} attacked #{character?.name} and missed"
      
      @characterSelected()
      
      # shakeTime = if dmg == 'miss' then 0 else 180
      
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
  
  didMiss: ->
    missPercent = Math.floor((Math.random()*100+1))
    missPercent > @accuracy
  
  rollDice: -> Math.floor((Math.random()*3+1))