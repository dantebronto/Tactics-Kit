class WolfSpecial extends RPG.Special
  button: ->
    checked = if @character.autoAttackChecked() then "checked='checked'" else ""
    """
    <span>auto</span>
    <input type='checkbox' class='auto-attack' #{checked}/>
    #{super()}
    """

class RPG.Wolf extends RPG.Player
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
    
    RPG.Special.bindGuard @, 'stay'
    @showMovableCells = ->
    @showAttackableCells = ->
  
  findTarget: -> RPG.TargetingHelper.closest(@)
  
  autoAttackChecked: -> @info.find('input.auto-attack').is(':checked')
  startTurn: -> if @autoAttackChecked() then super(true) else super
