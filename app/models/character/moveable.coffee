class window.Moveable
  
  initMovement: ->
    @x = @opts.x or 0
    @y = @opts.y or 0
  
  showMovableCells: ->
    return if @apLeft <= 0
    speed = @apLeft
    matrix = Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount
    matrix = @findNeighbors(@x, @y, matrix, speed-1)
    matrix.set @x, @y, 0
    matrix.each (x, y) ->
      if Number(this) == 1
        level.showCellAs('moveable', x, y)
      else
        type = if level.canWalkOn(x, y) then 'passable' else 'impassable'
        level.showCellAs(type, x, y)
    # level.hideCellAs('passable', @x, @y)
    matrix
  
  findNeighbors: (x, y, matrix, speed) ->
    surrounds = [ 
      [ x, y-1 ], [ x+1, y-1 ], [ x+1, y ], [ x+1, y+1 ],
      [ x, y+1 ], [ x-1, y+1 ], [ x-1, y ], [ x-1, y-1 ] 
    ]
    
    for i in [0..7]
      x = surrounds[i][0]
      y = surrounds[i][1]
      if level.canMoveTo(x, y)
        matrix.set(x, y, 1)
        matrix = @findNeighbors(x, y, matrix, speed-1) if speed > 0
    matrix
  
  moveTo: (x, y) ->
    console.log "#{@name} moving to #{x} #{y}"
    results = @findShortestPathTo(x, y)
    
    _(results).each (res) =>
      level.queue(1000, =>
        @getElem().unbind 'click'
        @subtractAp(1)
        @updateInfo()
        @hide()
        @x = res.pos.x
        @y = res.pos.y
        level.clear()
        @show()
        @bindElemClicked()
      )
    
    level.animate()
    
    
    # level.queue(1000, -> console.log 1)
    # .queue(1000, -> console.log 2)
    # .queue(1000, -> console.log 3)
    # .animate()
    