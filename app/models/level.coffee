class RPG.Level
  constructor: (opts={}) ->
    @turnFunction = opts.turnFunction or ->
    @endFunction = opts.endFunction or ->
    @map = new RPG.Level.Map opts.map # pass in the terrain map
    @inventory = opts.inventory or new RPG.Inventory()
    @players = opts.players or []
    @enemies = opts.enemies or []
    @eventDispatch = $({})
    
    @turnNum = 1
    @turnStart = opts.turnStart or ->
    
    @anim = [] # animation queue
    @animationInterval = opts.animationInterval or 250
    @load = @queue
    @start = @startNextCharacter
    
    @activeCharacter = null
    window.level = @
    
    $ =>
      @initCharacters()
      @win = $ window
      @stage = $ '#stage'
      @info = $ '#info'
      @console = $ '#console'
      @bindWindowResize()
      @win.trigger 'resize'
      @initAnimationQueue()
      @initAnimationSlider()
      @initLogging()
  
  initAnimationSlider: ->
    slider = $('#slider')
    
    refreshSlider = =>
      @animationInterval = 525 - Number(slider.slider('value'))
      @initAnimationQueue()
    
    slider.slider
      orientation: "horizontal",
      min: 25
      max: 500,
      value: 250,
      slide: refreshSlider,
      change: refreshSlider
      
    # console.log slider.slider('value')

  
  initLogging: ->
    previousHeight = 80
    level.log = (msg...) ->
      console.log(msg)
      li = $ "<li> #{msg} </li>"
      level.console.append(li).scrollTop(previousHeight += (li.height() + 10))
  
  remove: (obj) ->
    @players = _(@players).filter (player) => obj != player
    @enemies = _(@enemies).filter (enemy) =>  obj != enemy
    
    if @players.length == 0
      @gameOver()
    else if @enemies.length == 0
      @next()
    
    obj.hide() if obj.hide
  
  # TODO: have level mixin map functions?
  add: (obj) -> 
    @players.push(obj) if obj.isTypeOf 'Player'
    @map.add obj # TODO: assign ids, add to Qs
  getElem: (obj) -> @map.getElem obj
  canMoveTo: (x, y) -> @map.canMoveTo(x, y)
  canWalkOn: (x, y) -> @map.canWalkOn(x, y)
  canAttack: (x, y) -> @map.canAttack(x, y)
  showCellAs: (type, x, y) -> @map.showCellAs type, x, y
  hideCellAs: (type, x, y) -> @map.hideCellAs type, x, y
  clear: (x, y) -> @map.clear(x, y)
  
  # TODO: add @eventDispatch and these to evented mixin
  on: (event, cb) -> @eventDispatch.bind(event, cb)
  trigger: (event, msg) -> @eventDispatch.trigger(event, msg)
  
  # @on 'create', @onCreate
  # @on 'turnStart', @onTurnStart
  # @on 'turnEnd', @onTurnEnd 
  # @on 'gameOver' @onGameOver
  # etc...
  
  initCharacters: ->
    @add player for player in @players if @players.length > 0
    @add enemy  for enemy  in @enemies if @enemies.length > 0
  
  initAnimationQueue: -> 
    clearInterval @previousInterval if @previousInterval
    @previousInterval = setInterval((=> @nextTick() if @anim[0]), @animationInterval)
  
  queue: (delayOrFn=0) ->
    @anim.push delayOrFn if @anim[0] != delayOrFn
    @
  
  nextTick: ->
    if typeof @anim[0] == 'number'
      @anim[0] -= 1
      @anim.shift() if @anim[0] <= 0
    else if typeof @anim[0] == 'function'
      # fns don't count against timeout period, but still occur in order
      @anim.shift()() while typeof @anim[0] == 'function' 
      @anim[0] -= 1 if typeof @anim[0] == 'number'
  
  bindWindowResize: ->
    resizeFn = =>
      @stage.css('height', @win.height()+'px')
      @info.css('height', @win.height()+'px')
    
    debounced = _.debounce(resizeFn, 500)
    @win.resize debounced
  
  gameOver: ->
    level.log 'You have fallen in battle...'
    $('body').fadeOut 5000, -> location.reload true
  
  next: -> 
    level.log 'You win!'
    $('body').fadeOut 2000, -> location.reload true
  
  startNextCharacter: ->
    @anim = [] # clear animation queue, not sure if necessary anymore
    nextChar = _(@players.concat(@enemies)).filter((char) -> not char.hasGone)[0]
    if nextChar?
      nextChar.startTurn()
    else
      @queue => # next turn
        @turnStart()
        @turnFunction(@turnNum += 1)
        @restoreCharacters()
        @startNextCharacter()
  
  restoreCharacters: ->
    _(@players.concat(@enemies)).each (char) ->
      char.hasGone = false
      char.addAp char.ap