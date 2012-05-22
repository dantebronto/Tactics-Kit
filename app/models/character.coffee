class window.Character
  
  @findByPosition: (x, y) ->
    _(level.players.concat level.enemies).select( (char) ->
      char.x == x and char.y == y
    )[0]
  
  @mixin: (mixins...) ->
    for mixin in mixins
      for key, value of mixin::
        @::[key] = value
  
  Character.mixin Experience
  Character.mixin LifeForce
  Character.mixin Actionable
  Character.mixin Movable
  Character.mixin Attacking
  Character.mixin PathFinding
  
  constructor: (@opts={}) ->
    @name = @opts.name or 'Catan'
    @sprite = @opts.sprite or '/images/alien.gif'
    @inventory = @opts.inventory or new Inventory()
    @level = @opts.level or 1
    @isBot = @opts.isBot or false
    @specials = @opts.specials or []
    
    @initAp()
    @initHp()
    @initMovement()
    @initAttacking()
    @initExperience()
    @initPathFinding()
    
    @accuracy = @opts.accuracy or 80+Math.floor(@level*0.19)
    @strength = @opts.strength or @level
    
    @weapon = @opts.weapon or new Weapon()
    
    @eventDispatch = $({})
    
    @onCreate = @opts.onCreate or ->
    @onTurnStart = @opts.onTurnStart or ->
    @onTurnEnd = @opts.onTurnEnd or ->
    @onDeath = @opts.onDeath or ->
    @beforeDoDamage = @opts.beforeDoDamage or (dmg) -> dmg
    @afterDoDamage = @opts.afterDoDamage or (dmg) -> dmg
    @beforeMove = @opts.beforeMove or ->
    @afterMove = @opts.afterMove or ->
    
    $ =>
      @bindEvents()
    @
  
  isTypeOf: (klazzString) ->
    next_proto = @__proto__
    retval = []
    while next_proto.constructor.name != "Object"
      retval.push next_proto.constructor.name
      next_proto = next_proto.__proto__
    _(retval).include(klazzString)
  
  initSprite: ->
    @spriteImage = @info.find('img')
    @spriteImage.load =>
      @spriteImageWidth = @spriteImage.width()
      @spriteImageHeight = @spriteImage.height()
  
  addedToLevel: ->
    @drawInfo()
    @initSprite()
    @bindInfoClicked()
    @trigger 'create'
  
  characterSelected: (secondary=false) ->
    level.map.elem.find('img.turn-indicator').remove()
    arrow = $ "<img class='turn-indicator' src='/images/arrow.png' />"
    level.map.overlayMatrix.get(@x, @y).prepend arrow
    level.clear()
    level.activeCharacter = @
    @showMovableCells()
    @showAttackableCells(secondary)
  
  centerMapOnMe: ->
    mapLeft = level.stage.position().left
    myOffset = @getElem().offset()
    myLeft = myOffset.left
    myTop = myOffset.top
    
    mapScrollTop = level.stage.scrollTop()
    mapHeight = level.stage.height()
    mapScrollLeft = level.stage.scrollLeft()
    mapWidth = level.stage.width()
    
    # TODO: figure out ranges to check
    # if myTop < 0
    # level.stage.scrollTop(mapScrollTop+myTop-(mapHeight/2))
    # else if myTop >= (mapScrollTop + mapHeight - 40)
    level.stage.scrollTop(mapScrollTop+myTop-(mapHeight/2))
    
    # if myLeft < 120
    # level.stage.scrollLeft(mapScrollLeft+myLeft-(mapWidth/2))
    # else if myLeft >= (mapScrollLeft + mapWidth)
    level.stage.scrollLeft(mapScrollLeft+myLeft-(mapWidth/2))
    
  act: ->
    origX = @x
    origY = @y
    return if level.enemies.length == 0 or level.players.length == 0 # no one to fight
    
    level.queue =>
      target = @findTarget()
      distanceToTarget = if target then @chebyshevDistance(target.x, target.y) else Infinity
      if distanceToTarget <= @weapon.range
        @attack target.x, target.y
      else
        @moveTo target.x, target.y unless distanceToTarget == Infinity
        level.queue =>
          @endTurn() if origX == @x and origY == @y # didn't move, somehow got blocked
    
    level.queue =>
      if @apLeft > 1 then @act() else @endTurn()
  
  bindInfoClicked: -> 
    @info.bind 'click', => 
      @centerMapOnMe()
      @characterSelected()
  
  getElem: -> level.getElem @
  
  drawInfo: -> # fill in the info div
    @info = $(TMPL.characterInfo(@))
    @info.hide()
    level.map.info.find('ul').append @info
    @info.fadeIn 'slow'
  
  updateInfo: -> @info.html($(TMPL.characterInfo(@)).html())
  
  on: (event, cb) -> @eventDispatch.bind(event, cb)
  trigger: (event, msg) -> @eventDispatch.trigger(event, msg)
  
  bindEvents: ->
    @on 'create', @onCreate
    @on 'turnStart', @onTurnStart
    @on 'turnEnd', @onTurnEnd
    # @on 'die', @onDeath
  
  remove: -> @hide()
  
  hide: ->
    @getElem()
      .css('background', 'transparent')
      .removeClass('pointer occupied')
  
  show: ->
    @getElem()
      .css('background', "url(#{@sprite}) no-repeat center")
      .addClass('pointer occupied')