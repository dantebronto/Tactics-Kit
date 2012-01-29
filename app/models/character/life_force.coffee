class window.LifeForce
  
  initHp: ->
    @hp = @opts.hp or Math.floor(50.1+@level*7.65)
    @hpLeft = @hp
  
  subtractHp: (amt=0) ->
    @hpLeft -= amt
    @hpLeft = 0 if @hpLeft < 0
    @updateInfo()
    @die() if @hpLeft <= 0
  
  addHp: (amt) ->
    @hpLeft += amt
    @hpLeft = @hp if @hpLeft > @hp
    @updateInfo()
  
  die: ->
    @trigger 'die'
    @info.fadeOut('slow')
    level.clear()
    level.remove @