class window.Experience
  
  initExperience: ->
    @exp = @opts.exp or Math.floor(@hp*1.3)
    @expNext = @opts.expNext or Math.floor(@hp*1.3)
    @levelUp = @opts.onLevelUp or @onLevelUp
  
  addExp: (amt) ->
    _(amt).times =>
      @exp += 1
      @expNext -= 1
      @levelUp() if @expNext <= 0
  
  onLevelUp: ->
    @level += 1
    @ap = Math.floor 2+@level*0.07
    @hp = Math.floor 50.1+@level*7.65
    @expNext = @hp*5
    @hpLeft = @hp
    @accuracy = 80+Math.floor @level*0.19
    @strength = @level
    @updateInfo()
    console.log "Level up! #{@name} is now level #{@level}"