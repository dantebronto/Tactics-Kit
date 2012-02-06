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
    @info.fadeOut 'slow'
    @animateDeath()
    @remove()
    @distributeExperience()
    level.clear()
    level.remove @
  
  animateDeath: ->
    ghost = @spriteImage.clone()
    ghost.css
      left: "#{(50 - @spriteImageWidth)/2}px"
      top: "#{(50 - @spriteImageHeight)/2}px"
      position: 'absolute'
    level.map.overlayMatrix.get(@x, @y).append ghost
    ghostClone = ghost.clone()
    level.map.overlayMatrix.get(@x, @y).append ghostClone
    ghost.animate({ top: '-=200px', opacity: 0 }, 2000, -> ghost.remove())
    ghostClone.fadeOut(5000, -> ghostClone.remove())