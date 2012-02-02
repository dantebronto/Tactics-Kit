class window.Enemy extends Character
  constructor: (opts) ->
    super(opts)
  
  addedToLevel: ->
    super()
    @info.find('button').hide()