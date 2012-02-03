/* DO NOT MODIFY. This file was compiled Thu, 02 Feb 2012 22:11:57 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/moveable.coffee
 */

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  window.Moveable = (function() {
    function Moveable() {}
    Moveable.prototype.initMovement = function() {
      this.x = this.opts.x || 0;
      return this.y = this.opts.y || 0;
    };
    Moveable.prototype.showMovableCells = function() {
      var matrix, speed;
      if (this.apLeft <= 0) {
        return;
      }
      speed = this.apLeft;
      matrix = Level.Matrix.newFilledMatrix(level.map.rowCount, level.map.colCount);
      matrix = this.findMoveableNeighbors(this.x, this.y, matrix, speed - 1);
      matrix.set(this.x, this.y, 0);
      return matrix.each(function(x, y) {
        var type;
        if (Number(this) === 1) {
          return level.showCellAs('moveable', x, y);
        } else {
          type = level.canWalkOn(x, y) ? 'passable' : 'impassable';
          level.showCellAs(type, x, y);
          return matrix;
        }
      });
    };
    Moveable.prototype.findMoveableNeighbors = function(x, y, matrix, speed) {
      var i, surrounds;
      surrounds = [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y + 1], [x - 1, y], [x - 1, y - 1]];
      for (i = 0; i <= 7; i++) {
        x = surrounds[i][0];
        if (x < 0) {
          x = 0;
        }
        if (x > level.map.colCount) {
          x = level.map.colCount;
        }
        y = surrounds[i][1];
        if (y < 0) {
          y = 0;
        }
        if (y > level.map.rowCount) {
          y = level.map.rowCount;
        }
        if (level.canMoveTo(x, y)) {
          if (matrix.get(x, y) !== 1) {
            matrix.set(x, y, 1);
          }
          if (speed > 0) {
            matrix = this.findMoveableNeighbors(x, y, matrix, speed - 1);
          }
        }
      }
      return matrix;
    };
    Moveable.prototype.moveTo = function(x, y) {
      var results;
      console.log("" + this.name + " moving to " + x + " " + y);
      results = this.findShortestPathTo(x, y);
      _(results).each(__bind(function(res) {
        return level.queue(1000, __bind(function() {
          this.getElem().unbind('click');
          this.subtractAp(1);
          this.updateInfo();
          this.hide();
          this.x = res.pos.x;
          this.y = res.pos.y;
          this.characterSelected();
          return this.show();
        }, this));
      }, this));
      return level.animate();
    };
    return Moveable;
  })();
}).call(this);
