class window.Level
  constructor: (opts={}) ->
    @turnFunction = opts.turnFunction or ->
    @endFunction = opts.endFunction or ->
    @map = new Level.Map opts.map # pass in the terrain map
    @inventory = opts.inventory or new Inventory()
    @players = opts.players or []
    @enemies = opts.enemies or []
    @eventDispatch = $({})
    @anim = $({}) # animation queue
    @activePlayer = null
    
    @animationSpeed = opts.animationSpeed or 500
    @initAnimationQueue()
    
    $ =>
      @initCharacters()
      @win = $ window
      @stage = $ '#stage'
      @info = $ '#info'
      @bindWindowResize()
      @win.trigger 'resize'
  
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
  
  initAnimationQueue: ->
    
  queue: (delay, fn) ->
    # make `delay` optional arg
    if typeof delay == 'function'
      fn = delay 
      delay = 0
    @anim.queue('lvl', => 
      fn()
      setTimeout((=> @anim.dequeue('lvl')), delay))
    @
  
  animate: -> 
    # kickoff the first animation
    @anim.dequeue('lvl')
    @
  
  bindWindowResize: ->
    @win.resize =>
      @stage.css('height', @win.height()+'px')
      @info.css('height', @win.height()+'px')
      
  gameOver: ->
    console.log 'You have fallen in battle...'
    $('body').fadeOut 5000, -> location.reload(true)
  
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
#   distribute_exp: function(amt){
#     var chars = this.players;
#     for(var i = chars.length - 1; i >= 0; i--)
#       chars[i].add_exp(amt);