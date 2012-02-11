class window.Actionable
  
  initAp: ->
    @ap = @opts.ap or Math.floor(4+@level*0.07)
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
      level.queue(=> level.startNextCharacter())
    @updateInfo()
  
  startTurn: -> console.log "It's #{@name}'s turn"
  
  endTurn: -> 
    @subtractAp @apLeft
    level.clear()
    