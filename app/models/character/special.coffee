class window.Special
  
  @bindAuto = (char) ->
    return if char.isBot
    new Special
      character: char
      buttonText: 'auto'
      action: => char.startTurn true
  
  constructor: (opts={}) ->
    @apCost = opts.apCost or 2
    @character = if opts.character then opts.character else throw 'no character provided!'
    @character.specials.push @
    @action = opts.action or ->
    @buttonText = opts.buttonText
    @bindButtonClicked() if @buttonText
    @character.updateInfo()
  
  bindButtonClicked: ->
    @character.info.on 'click', ".#{@buttonText}", (e) =>
      level.activeCharacter = @character
      level.clear()
      @action.call @
      e.stopPropagation()
  
  button: ->
    return unless @buttonText
    disabled = if @apCost > @character.apLeft then 'disabled' else ''
    "<button class='#{@buttonText}' #{disabled} type='button'>#{@buttonText}</button>"