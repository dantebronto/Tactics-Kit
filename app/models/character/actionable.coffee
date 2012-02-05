class window.Actionable
  
  initAp: ->
    @ap = @opts.ap or Math.floor(4+@level*0.07)
    @apLeft = @ap
  
  addAp: (amt) ->
    @apLeft += amt
    @apLeft = @ap if @apLeft > @ap
    @updateInfo()
  
  subtractAp: (amt) ->
    @apLeft -= amt
    @endTurn() if @apLeft <= 0
    @updateInfo()
  
  startTurn: -> console.log "It's #{@name}'s turn"
  
  hasGone: -> @apLeft == 0
  endTurn: -> level.startNextCharacter()