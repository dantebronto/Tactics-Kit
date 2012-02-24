class WolfSpecial extends Special
  button: ->
    checked = if @character.autoAttackChecked() then "checked='checked'" else ""
    """
    <span>auto</span>
    <input type='checkbox' class='auto-attack' #{checked}/>
    #{super()}
    """

class window.Wolf extends Player
  constructor: (opts) -> 
    super opts
    @sprite = opts.sprite or '/images/wolf.png'
    @name = opts.name or 'Wolf'
  
  addedToLevel: ->
    super()
    
    new WolfSpecial
      character: @
      buttonText: 'attack'
      action: => @startTurn true
    
    Special.bindGuard @, 'stay'
    @showMovableCells = ->
    @showAttackableCells = ->
  
  autoAttackChecked: -> @info.find('input.auto-attack').is(':checked')
  startTurn: -> if @autoAttackChecked() then super(true) else super
