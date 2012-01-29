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
    if @apLeft < 0
      @apLeft = 0
      @endTurn()
    @updateInfo()
  
  hasGone: -> @apLeft == 0
  endTurn: -> @subtractAp(@apLeft)