class RPG.Movable
  
  initMovement: ->
    @x = @opts.x or 0
    @y = @opts.y or 0
  
  showMovableCells: ->
    return if @apLeft <= 0
    speed = @apLeft
    matrix = RPG.Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount
    matrix = @findMovableNeighbors(@x, @y, matrix, speed-1)
    matrix.set @x, @y, 0
    matrix.each (x, y) ->
      if Number(this) == 1
        level.showCellAs('movable', x, y)
      else
        type = if level.canWalkOn(x, y) then 'passable' else 'impassable'
        level.showCellAs(type, x, y)
        matrix
  
  findMovableNeighbors: (x, y, matrix, speed) ->
    surrounds = [ 
      [ x, y-1 ], [ x+1, y-1 ], [ x+1, y ], [ x+1, y+1 ],
      [ x, y+1 ], [ x-1, y+1 ], [ x-1, y ], [ x-1, y-1 ] 
    ]
    
    for i in [0..7]
      x = surrounds[i][0]
      x = 0 if x < 0
      x = level.map.colCount if x > level.map.colCount
      
      y = surrounds[i][1]
      y = 0 if y < 0
      y = level.map.rowCount if y > level.map.rowCount
      
      if level.canMoveTo(x, y)
        matrix.set(x, y, 1) unless matrix.get(x, y) is 1
        matrix = @findMovableNeighbors(x, y, matrix, speed-1) if speed > 0
    matrix
  
  moveTo: (x, y, ignoreBlockers=false) ->
    results = @findShortestPathTo(x, y, ignoreBlockers)
    results = @findShortestPathTo(x, y, true) if results.length == 0
    
    # remove the last position if can't move to it
    lastPos = results[results.length-1]?.pos
    results.pop() if lastPos and !level.canMoveTo(lastPos.x, lastPos.y)
    
    lastPos = results[results.length-1]?.pos
    blocked = false
    
    _(results[0..@apLeft]).each (res) =>
      level.queue(=>
        blocked = true unless level.canMoveTo(res.x, res.y)
        return if @apLeft <= 0 or blocked
        @subtractAp 1
        @getElem().unbind 'click'
        @updateInfo()
        @hide()
        @x = res.pos.x
        @y = res.pos.y
        @characterSelected()
        @show()
        cb() if cb? if lastPos == res.pos
      ).queue(2)
    results