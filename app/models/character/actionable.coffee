class window.Actionable
  
  initAp: ->
    @ap = @opts.ap or Math.floor(2+@level*0.07)
    @apLeft = @ap
    @hasGone = false
  
  addAp: (amt) ->
    @apLeft += amt
    @apLeft = @ap if @apLeft > @ap
    @updateInfo()
  
  subtractAp: (amt=0) ->
    @apLeft -= amt
    if @apLeft <= 0
      @hasGone = true
      level.queue(=> level.clear(); level.startNextCharacter())
    @updateInfo()
  
  startTurn: (oneTurnBot=false) ->
    level.log "It's #{@name}'s turn" unless oneTurnBot
    @centerMapOnMe()
    
    if @isBot or oneTurnBot or @isTypeOf 'Enemy'
      @characterSelected()
      @showAttackableCells(true)
      level.queue(2).queue => level.clear(); @characterSelected()
    else
      level.clear()
      @characterSelected()
  
  endTurn: ->
    @subtractAp @apLeft
    level.clear()    