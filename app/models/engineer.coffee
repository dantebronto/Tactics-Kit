class RPG.Engineer extends RPG.Player
  
  constructor: (opts) ->
    super opts
    @turretCount = 0
    @eventDispatch.bind 'afterUpdateInfo', =>
      @engineeringSpecial.disabled = true if @turretCount >= 1
  
  addedToLevel: ->
    super()
    @engineeringSpecial = new RPG.Special
      character: @
      buttonText: 'turret'
      apCost: 2
      action: =>
        if @turretCount >= 1
          @engineeringSpecial.disabled = true
          return
        
        myX = @x
        myY = @y
        level.map.underlayMatrix.each (x,y) ->
          inRange = _([ Math.abs(myX - x), Math.abs(myY - y) ]).max() < 2
          if inRange and level.canMoveTo(x, y)
            level.map.underlayMatrix.get(x,y)?.addClass 'healable'
        
        @createTurret()
      
        $('body').one 'click', (e) =>
          level.clear()
          level.activeCharacter?.characterSelected()
  
  createTurret: ->
    new RPG.Burstable
      type: 'healable'
      activated: (x,y) =>
        if level.canMoveTo(x,y)
          new Engineer.Turret
            x:x, y:y 
            special: @engineeringSpecial
            creator: @ 
    .showArea()
  
  specialMove: =>
    char = @engineeringSpecial.character
    matrix = RPG.Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount, 0
    matrix = char.findAttackableNeighbors(char.x, char.y, matrix, 3)
    shouldBuildTurret = @turretCount < 1
    
    if shouldBuildTurret
      shouldBuildTurret = false
      matrix.each (x, y, val) ->
        shouldBuildTurret = true if val == 1
      if shouldBuildTurret # should still build?
        return unless target = @findTarget()
        matrix = RPG.Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount, 0
        matrix = @findMovableNeighbors(@x, @y, matrix, 0)
        matrix.debug()
        bestPlacement = undefined
        closestDistance = Infinity
        matrix.each (x, y, val) =>
           if val == 1
             dist = @chebyshevDistance(x, y, target.x, target.y)
             if dist < closestDistance
               closestDistance = dist 
               bestPlacement = [x, y]
        if bestPlacement
          new Engineer.Turret
            x:bestPlacement[0], y:bestPlacement[1]
            special: @engineeringSpecial
            creator: @ 
          

class RPG.Engineer.Turret extends RPG.Player
  constructor: (opts) ->
    super opts
    @special = opts.special
    @creator = opts.creator
    @exp = opts.exp or 0
    @name = opts.name or 'Turret'
    @ap = opts.ap or 2
    @apLeft = @ap
    @sprite = opts.sprite or '/images/turret.png'
    @isBot = opts.isBot or true
    @weapon = opts.weapon or new RPG.Weapon(range: 3)
    @onDeath = opts.onDeath or =>
      @creator.turretCount -= 1
      @creator.turretCount = 0 if @creator.turretCount < 0
      @special.disabled = false if @creator.turretCount < 1
    
    @moveTo = opts.moveTo or ->
    @showMovableCells = opts.showMovableCells or ->
    level.add @
    @creator.subtractAp @special.apCost or 2
    @creator.turretCount += 1
    
    @special.disabled = true if @creator.turretCount >= 2