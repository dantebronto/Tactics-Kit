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
  
  attack: (x, y, cb) ->
    return if @apLeft < 2
    @doDamage x, y
  
  doDamage: (x, y) ->
    dmg = 0
    _(@strength + @weapon.attack).times => dmg += @rollDice()
    dmg = 'miss' if @didMiss()
    @animateDamage(x, y, dmg)
    
  animateDamage: (x, y, dmg) ->
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
    
    level.queue(50).queue(=>
      return if @apLeft <= 0
      level.map.statMatrix.get(x, y).append(hits).show()
      character = Character.findByPosition(x, y)
      
      offset = (50 - hits.width())/2
      hits.css
        position: 'absolute' 
        left: "#{offset}px"
      
      unless dmg == 'miss'
        character?.subtractHp(Number(dmg))
        console.log "#{@name} attacks #{character?.name} and does #{dmg} damage"
      else
        console.log "#{@name} attacked #{character?.name} and missed"
      @subtractAp 2
      @characterSelected()
      
      hits.show().shake(3, 3, 180, (->), offset).fadeOut 500, =>
        hits.remove()
    )
  
  didMiss: ->
    missPercent = Math.floor((Math.random()*100+1))
    missPercent > @accuracy
  
  rollDice: -> Math.floor((Math.random()*3+1))