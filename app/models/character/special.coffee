class window.Special
  constructor: (opts={}) ->
    @apCost = opts.apCost or 2
    @character = if opts.character then opts.character else throw 'no character provided!'
    @character.specials.push @
    @action = opts.action or ->
    @bindButtonClicked() if @buttonText = opts.buttonText
  
  bindButtonClicked: ->
    level.queue =>
      @character.info.on 'click', ".#{@buttonText}", (e) =>
        level.activeCharacter = @character
        level.clear()
        @action.call @
        e.stopPropagation()
  
  button: ->
    return unless @buttonText
    disabled = if @apCost > @character.apLeft then 'disabled' else ''
    "<button class='#{@buttonText}' #{disabled} type='button'>#{@buttonText}</button>"