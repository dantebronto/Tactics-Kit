class RPG.Character
  
  @findByPosition: (x, y) ->
    _(level.players.concat level.enemies).select( (char) ->
      char.x == x and char.y == y
    )[0]
  
  @mixin: (mixins...) ->
    for mixin in mixins
      for key, value of mixin::
        @::[key] = value
  
  Character.mixin RPG.Experience
  Character.mixin RPG.LifeForce
  Character.mixin RPG.Actionable
  Character.mixin RPG.Movable
  Character.mixin RPG.Attacking
  Character.mixin RPG.PathFinding
  
  constructor: (@opts={}) ->
    @name = @opts.name or 'Catan'
    @sprite = @opts.sprite or '/images/alien.gif'
    @inventory = @opts.inventory or new RPG.Inventory()
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
    
    @weapon = @opts.weapon or new RPG.Weapon()
    
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
    @spriteImage = @info.find('img').clone()
    @spriteImage.load =>
      @spriteImageWidth = @spriteImage[0].width
      @spriteImageHeight = @spriteImage[0].height
      $ => @show() # may need to re-draw some characters
    
    # have to bust the cache to reliably get sprite dimensions
    @spriteImage.attr('src', @spriteImage.attr('src') + '?' + Math.random())
  
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
    el = @getElem()
    return unless el
    mapLeft = level.stage.position().left
    myOffset = el.offset()
    myLeft = myOffset.left
    myTop = myOffset.top
    
    mapScrollTop = level.stage.scrollTop()
    mapHeight = level.stage.height()
    mapScrollLeft = level.stage.scrollLeft()
    mapWidth = level.stage.width()
    
    # TODO: figure out ranges to check
    if myTop < 0
      level.stage.scrollTop(mapScrollTop+myTop-(mapHeight/2))
    else if myTop >= (mapScrollTop + mapHeight - 40)
      level.stage.scrollTop(mapScrollTop+myTop-(mapHeight/2))
    
    if myLeft < 120
      level.stage.scrollLeft(mapScrollLeft+myLeft-(mapWidth/2))
    else if myLeft >= (mapScrollLeft + mapWidth)
      level.stage.scrollLeft(mapScrollLeft+myLeft-(mapWidth/2))
    
  act: ->
    origX = @x
    origY = @y
    return if level.enemies.length == 0 or level.players.length == 0 # no one to fight
    
    didMove = @specialMove(Math.random()*100+1)
    
    unless didMove
      # default action: attack if in range, otherwise move to target
      level.queue =>
        return if @apLeft <= 0
        target = @findTarget()
      
        distanceToTarget = if target then @chebyshevDistance(target.x, target.y) else Infinity
        if distanceToTarget <= @weapon.range
          @attack target.x, target.y
        else
          @moveTo target.x, target.y unless distanceToTarget == Infinity
          level.queue =>
            @endTurn() if origX == @x and origY == @y # didn't move, somehow got blocked
    
    level.queue =>
      if @apLeft > 0 then @act() else @endTurn()
  
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
    @info.on 'mouseover', =>
      level.map.elem.find('img.turn-indicator').remove()
      arrow = $ "<img class='turn-indicator' src='/images/arrow.png' />"
      level.map.overlayMatrix.get(@x, @y).prepend arrow
    @info.on 'mouseout', =>
      level.map.elem.find('img.turn-indicator').remove()
      arrow = $ "<img class='turn-indicator' src='/images/arrow.png' />"
      if ac = level.activeCharacter
        level.map.overlayMatrix.get(ac.x, ac.y).prepend arrow
  
  updateInfo: ->
    @eventDispatch.trigger 'beforeUpdateInfo'
    @info.html($(TMPL.characterInfo(@)).html())
    if el = @getElem()
      el.find('.hp').css('width', "#{(@hpLeft/@hp)*100}%")
      el.find('.ap').css('width', "#{(@apLeft/@ap)*100}%")
    @eventDispatch.trigger 'afterUpdateInfo'
  
  on: (event, cb) -> @eventDispatch.bind(event, cb)
  trigger: (event, msg) -> @eventDispatch.trigger(event, msg)
  
  bindEvents: ->
    @on 'create', @onCreate
    @on 'turnStart', @onTurnStart
    @on 'turnEnd', @onTurnEnd
    # @on 'die', @onDeath
  
  remove: -> @hide()
  
  hide: ->
    el = @getElem()
    el.css('background', 'transparent').removeClass('pointer occupied oversized')
    el.find('.small').remove()
    el.unbind 'hover'
  
  show: ->
    if el = @getElem()
      el.css('background', "url(#{@sprite}) no-repeat center").addClass('pointer occupied')
      el.addClass 'oversized' if @spriteImageWidth > 50 or @spriteImageHeight > 50
      el.append("<div class='hp small' style='width:#{(@hpLeft/@hp)*100}%'></div>
                 <div class='ap small' style='width:#{(@apLeft/@ap)*100}%'></div>")
      el.hover((=> @info.find('.character-info').css('background-color', '#CCC')), => @info.find('.character-info').css('background-color', '#808080'))
  
  specialMove: (chancePct, cb) -> false