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
  Character.mixin Moveable
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
    # beforeAttack, afterAttack
    # beforeMove, afterMove
    
    $ =>
      @bindEvents()
    @
  
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
  
  characterSelected: ->
    level.clear()
    level.activeCharacter = @
    @showMovableCells()
    @showAttackableCells()
  
  bindInfoClicked: -> @info.bind 'click', => @characterSelected()
  
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
    @on 'die', @onDeath
  
  remove: -> @hide()
  
  hide: ->
    @getElem()
      .css('background', 'transparent')
      .removeClass('pointer occupied')
  
  show: ->
    @getElem()
      .css('background', "url(#{@sprite}) no-repeat center")
      .addClass('pointer occupied')