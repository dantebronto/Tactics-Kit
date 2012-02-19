# TODO: refactor this madness
`
Array.prototype.removeGraphNode = function(obj) {
 for(var i=0;i<this.length;i++) {
   if(this[i].pos == obj.pos) { this.splice(i,1); }
 }
 return false;
};

Array.prototype.findGraphNode = function(obj) {
 for(var i=0;i<this.length;i++) {
   if(this[i].pos == obj.pos) { return this[i]; }
 }
 return false;
};
`

class AStar
  
  equals: (pos1, pos2) ->
    pos1.x == pos2.x and pos1.y == pos2.y
  
  constructor: ->
    tm = level.map.terrainMatrix
    matrix = Level.Matrix.newFilledMatrix(tm.rowCount, tm.colCount)
    matrix.each (x, y) ->
      cell =
        x: x, y: y,
        pos: { x: x, y: y }
        f: 0, g: 0, h: 0
        parent: null
        terrain: tm.get(x, y)
      matrix.set x, y, cell
    @grid = matrix

  search: (start, end) ->
    start = @grid.get start.x, start.y
    end = @grid.get end.x, end.y
    
    openList = []
    closedList = []
    openList.push start
    
    while openList.length > 0
      break if openList.length > 1000
      
      # Grab the lowest f(x) to process next
      lowInd = 0
      for i in openList.length
        lowInd = i if openList[i].f < openList[lowInd].f
      
      currentNode = openList[lowInd]
      
      # end case - result has been found, return the traced path
      if @equals(currentNode.pos, end.pos)
        curr = currentNode
        ret = []
        while curr.parent
          ret.push curr
          curr = curr.parent
        return ret.reverse()
      
      # normal case - move currentNode from open to closed, process each of its neighbors
      openList.removeGraphNode(currentNode)
      closedList.push currentNode
      
      for neighbor in @getNeighbors(currentNode)
        
        # not a valid node to process, skip to next neighbor
        if ( closedList.findGraphNode(neighbor) or (level.map.terrainMatrix.get(neighbor.x, neighbor.y) == 15) or !level.canMoveTo(neighbor.x, neighbor.y) and not @equals(neighbor.pos, end.pos) )
          continue
        
        # g score is the shortest distance from start to current node, we need to check if
        gScore = currentNode.g + 1 # 1 is the distance from a node to it's neighbor
        gScoreIsBest = false
        
        if not openList.findGraphNode(neighbor)
          # this the the first time we have arrived at this node, it must be the bes
          # also, we need to take the h (heuristic) score since we haven't done so yet
          
          gScoreIsBest = true
          neighbor.h = @heuristic neighbor.pos, end.pos
          openList.push neighbor
          
        else if gScore < neighbor.g
          # We have already seen the node, but last time it had a worse g (distance from start)
          gScoreIsBest = true
          
        if gScoreIsBest
          # found an optimal (so far) path to this node
          neighbor.parent = currentNode
          neighbor.g = gScore
          neighbor.f = neighbor.g + neighbor.h  
    
    # No result was found -- empty array signifies failure to find path
    return []
  
  getNeighbors: (node) ->
    ret = []
    x = node.x
    y = node.y

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
      
      ret.push got if got = @grid.get(x, y)
    ret
  
  # Manhattan distance
  heuristic: (pos0, pos1) -> Math.abs(pos1.x-pos0.x) + Math.abs(pos1.y-pos0.y)

class window.PathFinding
  
  findShortestPathTo: (x, y) ->
    new AStar(@).search { x: @x, y: @y }, { x: x, y: y }
  
  initPathFinding: ->