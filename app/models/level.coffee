class window.Level
  constructor: (opts={}) ->
    @turnFunction = opts.turnFunction or ->
    @endFunction = opts.endFunction or ->
    @map = new Level.Map opts.map # pass in the terrain map
    @inventory = opts.inventory or new Inventory()
    @players = opts.players or []
    @enemies = opts.enemies or []
    @eventDispatch = $({})
    
    @anim = [] # animation queue
    @animationInterval = opts.animationInterval or 250
    @load = @queue
    @start = @startNextCharacter
    
    @activeCharacter = null
    
    $ =>
      @initCharacters()
      @win = $ window
      @stage = $ '#stage'
      @info = $ '#info'
      @console = $ '#console'
      @bindWindowResize()
      @win.trigger 'resize'
      @initAnimationQueue()
      @initLogging()
  
  initLogging: ->
    if console?.log?
      console.originalLog = console.log
      previousHeight = 80
      console.log = (msg) ->
        console.originalLog(msg)
        list = level.console
        li = $ "<li> #{msg} </li>"
        list.append(li).animate scrollTop: previousHeight += (li.height() + 10)
  
  remove: (obj) ->
    @players = _(@players).filter (player) => obj != player
    @enemies = _(@enemies).filter (enemy) =>  obj != enemy
    
    if @players.length == 0
      @gameOver()
    else if @enemies.length == 0
      @next()
    
    obj.hide() if obj.hide
  
  # TODO: have level mixin map functions?
  add: (obj) -> @map.add obj # TODO: assign ids, add to Qs
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
  
  initAnimationQueue: -> setInterval((=> @nextTick()), @animationInterval)
  
  queue: (delayOrFn=0) ->
    @anim.push delayOrFn if @anim[0] != delayOrFn
    @
  
  nextTick: ->
    if typeof @anim[0] == 'number'
      @anim[0] -= 1
      @anim.shift() if @anim[0] <= 0
    else if typeof @anim[0] == 'function'
      @anim.shift()()
      @anim[0] -= 1 if typeof @anim[0] == 'number'
  
  bindWindowResize: ->
    resizeFn = =>
      @stage.css('height', (@win.height()-80)+'px')
      @info.css('height', @win.height()+'px')
    
    debounced = _.debounce(resizeFn, 500)
    @win.resize debounced
  
  gameOver: ->
    console.log 'You have fallen in battle...'
    $('body').fadeOut 5000, -> location.reload true
  
  next: -> 
    console.log 'You win!'
    $('body').fadeOut 5000, -> location.reload true
  
  startNextCharacter: ->
    @anim = [] # clear animation queue, not sure if necessary anymore
    nextChar = _(@players.concat(@enemies)).filter((char) -> not char.hasGone)[0]
    if nextChar?
      nextChar.startTurn()
    else
      @queue =>
        @restoreCharacters()
        @startNextCharacter()
  
  restoreCharacters: ->
    _(@players.concat(@enemies)).each (char) ->
      char.hasGone = false
      char.addAp char.ap