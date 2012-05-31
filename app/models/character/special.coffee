class RPG.Special
  
  constructor: (opts={}) ->
    @apCost = opts.apCost or 2
    @character = if opts.character then opts.character else throw 'no character provided!'
    @character.specials.push @
    @action = opts.action or ->
    @buttonText = opts.buttonText
    @disabled = false
    @bindButtonClicked() if @buttonText
    @character.updateInfo()
  
  bindButtonClicked: ->
    @character.info.on 'click', ".#{@buttonText}", (e) =>
      @character.characterSelected()
      level.activeCharacter = @character
      level.clear()
      @action.call @
      e.stopPropagation()
  
  button: ->
    return '' if !@buttonText or @character.isBot
    disabled = if ((@apCost > @character.apLeft) or @disabled) then 'disabled' else ''
    "<button class='#{@buttonText}' #{disabled} type='button'>#{@buttonText}</button>" 
  
  # just some default/basic special moves listed below
  
  @bindAuto: (chard, buttonText='auto') ->
    return if chard.isBot
    new Special
      character: chard
      buttonText: buttonText
      action: => chard.startTurn true
  
  @bindGuard: (chard, buttonText='guard') ->
    return if chard.isBot
    new Special
      apCost: 1
      character: chard
      buttonText: buttonText
      action: => 
        level.log "#{chard.name} is guarding"
        chard.subtractAp chard.apLeft
  
  @bindBomb: (chard) ->
    new Special
      apCost: 2
      character: chard
      buttonText: 'bomb'
      action: =>
        (new RPG.Burstable
          activated: (x,y) =>
            unless chard.apLeft > 0
              level.clear()
              return 
            used = []
            level.map.elem.find('span.attackable').each (el) ->
              [elx, ely] = $(@).getMatrixCoords()
              used.push {x:elx, y:ely} if RPG.Character.findByPosition(elx, ely)
            
            if used.length > 0
              level.queue =>
                _(used).each (point, index) ->
                  ex = $ "<img src='/images/explosion.png'/>"
                  ex.css { width: '0px', height: '0px', position: 'absolute', left: 25, top: 25 }
                  level.map.statMatrix.get(point.x, point.y).prepend(ex)
                  ex.animate({ width: '+=50', height: '+=50', left: 0, top: 0 }, 50, ->
                    chard.doDamage(point.x, point.y, 0, 0, true)
                  ).shake(3,3,200).fadeOut 200, ->
                    ex.remove()
                    if index == used.length - 1 # last hit
                      level.queue -> 
                        chard.subtractAp(2)
                        chard.characterSelected()
          onHover: (x,y) ->
            um = level.map.underlayMatrix
            for cell in [ um.get(x, y), um.get(x-1,y), um.get(x+1, y), um.get(x, y+1), um.get(x, y-1) ]
              cell?.addClass 'attackable'
        ).showArea()