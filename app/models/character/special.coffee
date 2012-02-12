class window.Special
  
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
    return if !@buttonText or @character.isBot
    disabled = if @apCost > @character.apLeft then 'disabled' else ''
    "<button class='#{@buttonText}' #{disabled} type='button'>#{@buttonText}</button>"
  
  @bindAuto = (char) ->
    return if char.isBot
    new Special
      character: char
      buttonText: 'auto'
      action: => char.startTurn true
  
  @bindGuard = (char) ->
    return if char.isBot
    new Special
      apCost: 1
      character: char
      buttonText: 'guard'
      action: => 
        console.log "#{char.name} is guarding"
        char.subtractAp char.apLeft
  
  @bindBomb = (char) ->
    new Special
      character: char
      buttonText: 'bomb'
      action: =>
        (new Burstable
          activated: (x,y) =>
            used = []
            level.map.underlayMatrix.each (x2, y2, el) =>
              if el.hasClass('attackable') and Character.findByPosition(x2, y2)
                used.push {x:x2, y:y2}
            if used.length > 0
              level.queue =>
                _(used).each (point, index) ->
                  ex = $ "<img src='/images/explosion.png'/>"
                  ex.css { width: '0px', height: '0px', position: 'absolute', left: 25, top: 25 }
                  level.map.statMatrix.get(point.x, point.y).prepend(ex)
                  ex.animate({ width: '+=50', height: '+=50', left: 0, top: 0 }, 50, ->
                  ).shake(3,3,200).fadeOut 200, ->
                    char.doDamage(point.x, point.y, 25, 0)
                    ex.remove()
                    level.queue(-> char.subtractAp(2)) if index == used.length - 1 # last hit
          onHover: (x,y) ->
            um = level.map.underlayMatrix
            for cell in [ um.get(x, y), um.get(x-1,y), um.get(x+1, y), um.get(x, y+1), um.get(x, y-1) ]
              cell?.addClass 'attackable'
        ).showArea()