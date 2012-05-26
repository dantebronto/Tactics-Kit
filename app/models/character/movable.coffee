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
  
  moveTo: (x, y) ->
    results = @findShortestPathTo(x, y)
    
    lastPos = results[results.length-1]?.pos
    results.pop() unless level.canMoveTo(lastPos.x, lastPos.y)
    blocked = false
    
    res = results[0]
    
    level.queue =>
      if !level.canMoveTo(res.x, res.y)
        blocked = true
        
        # # is there a way around other characters?
        # proposedPath = @findShortestPathTo(x, y, true)
        # lastStep = proposedPath[proposedPath.length-1]
        # proposedPath.pop() if lastStep and !level.canMoveTo(lastStep.x, lastStep.y)
        # if firstStep = proposedPath[0]
        #   if level.canMoveTo(firstStep.x, firstStep.y)
        #     res.x = firstStep.x if firstStep.x
        #     res.y = firstStep.y if firstStep.y
        #     blocked = false
        # else
        
        for step in results.reverse()
          proposedPath = @findShortestPathTo(step.x, step.y, true)
          lastStep = proposedPath[proposedPath.length-1]
          proposedPath.pop() if lastStep and !level.canMoveTo(lastStep.x, lastStep.y)
          
          if firstStep = proposedPath[0]
            if level.canMoveTo(firstStep.x, firstStep.y)
              res.x = firstStep.x
              res.y = firstStep.y
              blocked = false
              break
        
      return if @apLeft <= 0 or blocked
      @subtractAp 1
      @getElem().unbind 'click'
      @updateInfo()
      @hide()
      @x = res.x
      @y = res.y
      @characterSelected()
      @show()
      cb() if cb? if lastPos == res.pos
    .queue(2)
    results