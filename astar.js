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
var astar = {
  init: function(terrain_matrix) {
    var cell;
    matrix = Matrix.new_filled_matrix(terrain_matrix.rows(), terrain_matrix.cols());
    matrix.each(function(x, y){
      cell = { 
        x: x, y: y, 
        pos: { x: x, y: y }, 
        f: 0, g: 0, h: 0,
        parent: null,
        terrain: terrain_matrix.e(x, y)
      };
      matrix.set(x, y, cell);
    });
    return matrix;
  },
  search: function(terrain_matrix, start, end) {
    grid = astar.init(terrain_matrix);
  
    start = grid.e(start.x, start.y);
    end =   grid.e(end.x,   end.y);
  
    var openList   = [];
    var closedList = [];
    openList.push(start);
  
    while(openList.length > 0) {
      // Grab the lowest f(x) to process next
      var lowInd = 0;
      for(var i=0; i<openList.length; i++)
	      if(openList[i].f < openList[lowInd].f)
	        lowInd = i;

      var currentNode = openList[lowInd];
      
      // End case -- result has been found, return the traced path
      if(currentNode.pos == end.pos){
	      var curr = currentNode;
	      var ret = [];
	      
	      while(curr.parent) {
		      ret.push(curr);
		      curr = curr.parent;
	      }
	      return ret.reverse();
      }
	
      // Normal case -- move currentNode from open to closed, process each of its neighbors
      openList.removeGraphNode(currentNode);
      closedList.push(currentNode);
      var neighbors = astar.neighbors(grid, currentNode);
	
      for(var i=0; i<neighbors.length;i++) {
	      var neighbor = neighbors[i];
	      if(closedList.findGraphNode(neighbor) || neighbor.terrain > 10)
		      continue; // not a valid node to process, skip to next neighbor
	    
	      // g score is the shortest distance from start to current node, we need to check if
  	    //   the path we have arrived at this neighbor is the shortest one we have seen yet
  	    var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
  	    var gScoreIsBest = false;
		
	      if(!openList.findGraphNode(neighbor)) {
  		    // This the the first time we have arrived at this node, it must be the best
  		    // Also, we need to take the h (heuristic) score since we haven't done so yet
			
  		    gScoreIsBest = true;
  		    neighbor.h = astar.heuristic(neighbor.pos, end.pos);
  		    openList.push(neighbor);
  	    }
	      else if(gScore < neighbor.g) {
		      // We have already seen the node, but last time it had a worse g (distance from start)
		      gScoreIsBest = true;
	      }
		
  	    if(gScoreIsBest) {
	  	    // Found an optimal (so far) path to this node.  Store info on how we got here and
		      //  just how good it really is...
		      neighbor.parent = currentNode;
		      neighbor.g = gScore;
		      neighbor.f = neighbor.g + neighbor.h;
		    }
      }
    }
    // No result was found -- empty array signifies failure to find path
    return [];
  },
  heuristic: function(pos0, pos1) {
    // This is the Manhattan distance
  	var d1 = Math.abs (pos1.x - pos0.x);
    var d2 = Math.abs (pos1.y - pos0.y);
    return d1 + d2;
  },
  neighbors: function(grid, node){
    var ret = [];
    var x = node.x;
    var y = node.y;
    
    var surrounds = [ 
      [ x, y-1 ], [ x+1, y-1 ], [ x+1, y ], [ x+1, y+1 ],
      [ x, y+1 ], [ x-1, y+1 ], [ x-1, y ], [ x-1, y-1 ] 
    ];
    
    for(var i=0; i<8; i++){
      x = surrounds[i][0]; // first
      y = surrounds[i][1]; // last
      
      if( grid.e(x, y) )
        ret.push(grid.e(x, y));  
    }
    return ret;
  }
};
