/* DO NOT MODIFY. This file was compiled Sun, 05 Feb 2012 22:30:34 GMT from
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
      if (this.apLeft <= 0) return;
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
        if (x < 0) x = 0;
        if (x > level.map.colCount) x = level.map.colCount;
        y = surrounds[i][1];
        if (y < 0) y = 0;
        if (y > level.map.rowCount) y = level.map.rowCount;
        if (level.canMoveTo(x, y)) {
          if (matrix.get(x, y) !== 1) matrix.set(x, y, 1);
          if (speed > 0) {
            matrix = this.findMoveableNeighbors(x, y, matrix, speed - 1);
          }
        }
      }
      return matrix;
    };

    Moveable.prototype.moveTo = function(x, y, cb) {
      var lastPos, results, _ref, _ref2,
        _this = this;
      console.log("" + this.name + " moving to " + x + " " + y);
      results = this.findShortestPathTo(x, y);
      lastPos = (_ref = results[results.length - 1]) != null ? _ref.pos : void 0;
      if (!level.canMoveTo(lastPos.x, lastPos.y)) results.pop();
      lastPos = (_ref2 = results[results.length - 1]) != null ? _ref2.pos : void 0;
      return _(results).each(function(res) {
        return level.queue(function() {
          _this.getElem().unbind('click');
          _this.subtractAp(1);
          _this.updateInfo();
          _this.hide();
          _this.x = res.pos.x;
          _this.y = res.pos.y;
          _this.characterSelected();
          _this.show();
          if (cb && lastPos === res.pos) return cb();
        }).queue(1000);
      });
    };

    return Moveable;

  })();

}).call(this);
