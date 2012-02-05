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
    @animationInterval = opts.animationInterval or 100
    @initAnimationQueue()
    
    @activeCharacter = null
    
    $ =>
      @initCharacters()
      @win = $ window
      @stage = $ '#stage'
      @info = $ '#info'
      @bindWindowResize()
      @win.trigger 'resize'
      @startNextCharacter()
  
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
    @anim.push delayOrFn
    @
  
  nextTick: ->
    if typeof @anim[0] == 'number'
      @anim[0] -= @animationInterval
      @anim.shift() if @anim[0] <= 0
    else if typeof @anim[0] == 'function'
      @anim.shift()()
  
  bindWindowResize: ->
    resizeFn = =>
      @stage.css('height', @win.height()+'px')
      @info.css('height', @win.height()+'px')
    
    debounced = _.debounce(resizeFn, 500)
    @win.resize debounced
      
  gameOver: ->
    console.log 'You have fallen in battle...'
    $('body').fadeOut 5000, -> location.reload(true)
  
  startNextCharacter: ->
    console.log 'snc'
    console.log "#{e1.name} has #{e1.apLeft} ap left"
    nextChar = _(@players.concat(@enemies)).filter((char) -> not char.hasGone())[0]
    if nextChar?
      nextChar.startTurn()
    else
      @queue =>
        @restoreCharacters()
        @startNextCharacter()
  
  restoreCharacters: -> _(@players.concat(@enemies)).each (char) -> char.addAp(char.ap)
  
  next: -> alert 'You win!'
  
# class window.Level
#   constructor: (opts) ->
#     @map = opts.map
#     @info_div = $('#info')
#     @animation_speed = 0.5
#     @animation_queue = [] # new Array()
#     @turn = 1
#     @turn_function = ->
#     @highest_id = 0
#     @draw()
#   
#   next_active_enemy: ->
#     for enemy in @enemies
#       return enemy unless enemy.has_gone 
#   
#   next_active_player: ->
#     for player in @players
#       return player unless player.has_gone
#   
#   show_current_turn: ->
#     @active_enemy = @next_active_enemy()
#     @active_player = @next_active_player()
#     
#     @next() if level.enemies.length == 0
#     
#     if !@active_player and !@active_enemy
#       @reset_turn()
#     else if !@active_player
#       @active_enemy.calculate_turn() # activate next enemy
#   
#   activate_players: -> player.bind_events() for player in @players
#   restore_enemies: -> enemy.has_gone = false for enemy in @enemies
#   restore_players: -> player.ap_left = player.ap for player in @players
#   
#   reset_turn: ->
#     @restore_players()
#     @restore_enemies()
#     @activate_players()
#     @turn += 1
#     @turn_function()
# 