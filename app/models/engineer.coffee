class window.Engineer extends Player
  
  constructor: (opts) ->
    super opts
    @turretCount = 0
  
  addedToLevel: ->
    super()
    @engineeringSpecial = new Special
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
          inRange = _([ Math.abs(myX - x), Math.abs(myY - y) ]).max() < 3
          if inRange and level.canMoveTo(x, y)
            level.map.underlayMatrix.get(x,y)?.addClass 'healable'
      
        new Burstable
          type: 'healable'
          activated: (x,y) =>
            if level.canMoveTo(x,y)
              new Engineer.Turret
                x:x, y:y 
                special: @engineeringSpecial
                creator: @ 
        .showArea()
      
        $('body').one 'click', (e) =>
          level.clear()
          level.activeCharacter?.characterSelected()
    
    @engineeringSpecial.character.eventDispatch.bind 'afterUpdateInfo', =>
      if @engineeringSpecial.character.turretCount >= 1
        @engineeringSpecial.disabled = true
  
  class Engineer.Turret extends Player
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
      @weapon = opts.weapon or new Weapon(range: 3)
      @onDeath = opts.onDeath or =>
        @creator.turretCount -= 1
        @creator.turretCount = 0 if @creator.turretCount < 0
        @special.disabled = false if @creator.turretCount < 2
      
      @moveTo = opts.moveTo or ->
      @showMovableCells = opts.showMovableCells or ->
      level.add @
      @creator.subtractAp @special.apCost or 2
      @creator.turretCount += 1

      @special.disabled = true if @creator.turretCount >= 2