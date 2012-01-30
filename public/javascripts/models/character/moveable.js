/* DO NOT MODIFY. This file was compiled Mon, 30 Jan 2012 05:17:19 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/models/character/moveable.coffee
 */

(function() {
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
      matrix = this.findNeighbors(this.x, this.y, matrix, speed - 1);
      matrix.set(this.x, this.y, 0);
      matrix.each(function(x, y) {
        var type;
        if (Number(this) === 1) {
          return level.showCellAs('moveable', x, y);
        } else {
          type = level.canWalkOn(x, y) ? 'passable' : 'impassable';
          return level.showCellAs(type, x, y);
        }
      });
      level.hideCellAs('passable', this.x, this.y);
      return matrix;
    };
    Moveable.prototype.findNeighbors = function(x, y, matrix, speed) {
      var i, surrounds;
      surrounds = [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y + 1], [x - 1, y], [x - 1, y - 1]];
      for (i = 0; i <= 7; i++) {
        x = surrounds[i][0];
        y = surrounds[i][1];
        if (level.canMoveTo(x, y)) {
          matrix.set(x, y, 1);
          if (speed > 0) {
            matrix = this.findNeighbors(x, y, matrix, speed - 1);
          }
        }
      }
      return matrix;
    };
    Moveable.prototype.moveTo = function(x, y) {
      var res;
      console.log("" + this.name + " moving to " + x + " " + y);
      res = this.findShortestPathTo(x, y);
      this.subtractAp(res.length);
      this.updateInfo();
      this.getElem().unbind('click');
      this.hide();
      this.x = x;
      this.y = y;
      level.clear();
      this.show();
      return this.bindElemClicked();
    };
    return Moveable;
  })();
}).call(this);
