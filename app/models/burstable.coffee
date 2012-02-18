class window.Burstable
  
  constructor: (opts={}) ->
    # TODO: implement turn start drawing vs onHover distinction
    
    # you determine what you want to do here, the default is a small burst
    # highlight cells as attackable within 2 chebyshev distance
    @type = opts.type or 'attackable'
    @onHover = opts.onHover #or @smallBurstShape
    @activated = opts.activated or (x,y) -> console.log "activated at #{x},#{y}"
  
  showArea: ->
    level.map.underlayMatrix.each (x, y, elem) =>
      elem.one 'click', (e) =>
        targ = $ e.target
        if targ.hasClass('overlay')
          [x, y] = targ.getMatrixCoords()
          @activated(x, y)
          e.stopPropagation()
          $('body').trigger 'click'
      
      if @onHover
        elem.on 'mouseover', => @onHover(x, y)
        elem.on 'mouseout', -> level.clear()
    
    $('body').one 'click', (e) =>
      level.clear()
      level.activeCharacter?.characterSelected()
      level.map.underlayMatrix.each (x, y, elem) =>
        elem.unbind('mouseover').unbind('mouseout')
        elem.unbind 'click'
  
  smallBurstShape: (x,y)->
    level.map.underlayMatrix.each (x2, y2, el) =>
      el.addClass @type if _([ Math.abs(x - x2), Math.abs(y - y2) ]).max() < 2
