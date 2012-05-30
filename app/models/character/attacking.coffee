class RPG.Attacking
  
  initAttacking: ->
  
  showAttackableCells: (preview=false) ->
    level.clear() if preview
    return if @apLeft <= 0
    speed = @apLeft
    matrix = RPG.Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount, 0
    matrix = @findAttackableNeighbors(@x, @y, matrix, @weapon.range, preview)
    matrix.set @x, @y, 0
    matrix.each (x, y) -> 
      if Number(this) == 1
        level.showCellAs('attackable', x, y)
      else if preview
        level.showCellAs('impassable', x, y)
    matrix
  
  findAttackableNeighbors: (x, y, matrix, range, preview=false) ->
    matrix.each (x, y) =>
      inRange = @chebyshevDistance(x, y) <= range
      attackable = level.canAttack(x, y)
      matrix.set(x, y, 1) if (preview and inRange) or (inRange and attackable)
    matrix
  
  chebyshevDistance: (x, y, x2=@x, y2=@y) -> _([ Math.abs(x - x2), Math.abs(y - y2) ]).max()
  
  attack: (x, y) ->
    return if @apLeft < 1
    @doDamage x, y
  
  doDamage: (x, y, dmg, apToSubtract, groupDamage) ->
    dmg ?= 0
    apToSubtract ?= 1
    if dmg == 0
      _(@strength + @weapon.attack).times => dmg += @rollDice()
      dmg = 'miss' if @didMiss()
    dmg = @beforeDoDamage(dmg)
    @animateDamage(x, y, dmg, apToSubtract, groupDamage)
    @afterDoDamage(dmg)
  
  createHits: (dmg) ->
    if dmg.length is 1 or dmg is 'miss'
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
  
  animateDamage: (x, y, dmg, apToSubtract, groupDamage=false) ->
    hits = @createHits(dmg)
    
    level.queue => 
      return if @apLeft <= 0
      
      @subtractAp apToSubtract
      
      statEl = level.map.statMatrix.get(x, y)
      lastHit = statEl.find('h1, h2, h3, h4, h5, h6')
      lastHit.remove() if lastHit.length > 0
      statEl.append(hits).show()
      character = RPG.Character.findByPosition(x, y)
      
      offset = (50 - hits.width())/2
      hits.css
        position: 'absolute' 
        left: "#{offset}px"
      
      unless dmg == 'miss'
        character?.subtractHp(Number(dmg))
        level.log "#{@name} <span>&#9876;</span> #{character?.name} for #{dmg}"
        if character?.hpLeft == 0
          level.log "#{@name} <span>&#9760;</span> #{character.name}"
      else
        level.log "#{@name} <span>&#9876;</span> #{character?.name} but missed"
      
      @characterSelected()
      
      img = $('<img src="/images/burst.png" width="50" height="50" />')
      oo = level.map.overlayMatrix.get(@x,@y).offset()
      targoo = level.map.overlayMatrix.get(x,y).offset()
      img.appendTo(level.map.elem)
      img.css({position: 'absolute', top: oo.top, left: oo.left, width:50, height:50 }).
        animate { top: targoo.top, left: targoo.left }, level.animationInterval, 'swing', ->
          img.hide()
          hits.show()
          setTimeout((-> hits.remove()), level.animationInterval*4)
    
    level.queue(5) unless groupDamage
  
  didMiss: ->
    missPercent = Math.floor((Math.random()*100+1))
    missPercent > @accuracy
  
  rollDice: -> Math.floor((Math.random()*3+1))