/* DO NOT MODIFY. This file was compiled Mon, 30 Jan 2012 04:18:42 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/path_finding.coffee
 */

(function() {
  
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
;
  var AStar;
  AStar = (function() {
    AStar.prototype.equals = function(pos1, pos2) {
      return pos1.x === pos2.x && pos1.y === pos2.y;
    };
    function AStar() {
      var matrix, tm;
      tm = level.map.terrainMatrix;
      matrix = Level.Matrix.newFilledMatrix(tm.rowCount, tm.colCount);
      matrix.each(function(x, y) {
        var cell;
        cell = {
          x: x,
          y: y,
          pos: {
            x: x,
            y: y
          },
          f: 0,
          g: 0,
          h: 0,
          parent: null,
          terrain: tm.get(x, y)
        };
        return matrix.set(x, y, cell);
      });
      this.grid = matrix;
    }
    AStar.prototype.search = function(start, end) {
      var closedList, curr, currentNode, gScore, gScoreIsBest, i, lowInd, neighbor, openList, ret, _i, _j, _len, _len2, _ref, _ref2;
      start = this.grid.get(start.x, start.y);
      end = this.grid.get(end.x, end.y);
      openList = [];
      closedList = [];
      openList.push(start);
      while (openList.length > 0) {
        if (openList.length > 1000) {
          console.log('breaking');
          break;
        }
        lowInd = 0;
        _ref = openList.length;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          if (openList[i].f < openList[lowInd].f) {
            lowInd = i;
          }
        }
        currentNode = openList[lowInd];
        if (this.equals(currentNode.pos, end.pos)) {
          curr = currentNode;
          ret = [];
          while (curr.parent) {
            ret.push(curr);
            curr = curr.parent;
          }
          return ret.reverse();
        }
        openList.removeGraphNode(currentNode);
        closedList.push(currentNode);
        _ref2 = this.getNeighbors(currentNode);
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          neighbor = _ref2[_j];
          if (closedList.findGraphNode(neighbor) || (!level.canMoveTo(neighbor.x, neighbor.y) && !this.equals(neighbor.pos, end.pos))) {
            continue;
          }
          gScore = currentNode.g + 1;
          gScoreIsBest = false;
          if (!openList.findGraphNode(neighbor)) {
            gScoreIsBest = true;
            neighbor.h = this.heuristic(neighbor.pos, end.pos);
            openList.push(neighbor);
          } else if (gScore < neighbor.g) {
            gScoreIsBest = true;
          }
          if (gScoreIsBest) {
            neighbor.parent = currentNode;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
          }
        }
      }
      return [];
    };
    AStar.prototype.getNeighbors = function(node) {
      var got, i, ret, surrounds, x, y;
      ret = [];
      x = node.x;
      y = node.y;
      surrounds = [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y + 1], [x - 1, y], [x - 1, y - 1]];
      for (i = 0; i <= 7; i++) {
        x = surrounds[i][0];
        y = surrounds[i][1];
        if (got = this.grid.get(x, y)) {
          ret.push(got);
        }
      }
      return ret;
    };
    AStar.prototype.heuristic = function(pos0, pos1) {
      return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
    };
    return AStar;
  })();
  window.PathFinding = (function() {
    function PathFinding() {}
    PathFinding.prototype.findShortestPathTo = function(x, y) {
      return new AStar(this).search({
        x: this.x,
        y: this.y
      }, {
        x: x,
        y: y
      });
    };
    PathFinding.prototype.initPathFinding = function() {};
    return PathFinding;
  })();
}).call(this);
