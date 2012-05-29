/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:09 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/character/movable.coffee
 */

(function() {

  RPG.Movable = (function() {

    function Movable() {}

    Movable.prototype.initMovement = function() {
      this.x = this.opts.x || 0;
      return this.y = this.opts.y || 0;
    };

    Movable.prototype.showMovableCells = function() {
      var matrix, speed;
      if (this.apLeft <= 0) return;
      speed = this.apLeft;
      matrix = this.findMovableNeighbors(this.x, this.y, speed - 1);
      matrix.set(this.x, this.y, 0);
      return matrix.each(function(x, y) {
        var type;
        if (Number(this) === 1) {
          return level.showCellAs('movable', x, y);
        } else {
          type = level.canWalkOn(x, y) ? 'passable' : 'impassable';
          level.showCellAs(type, x, y);
          return matrix;
        }
      });
    };

    Movable.prototype.findMovableNeighbors = function(x, y, speed, matrix) {
      var i, surrounds;
      if (!matrix) {
        matrix = RPG.Level.Matrix.newFilledMatrix(level.map.rowCount, level.map.colCount, 0);
      }
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
            matrix = this.findMovableNeighbors(x, y, speed - 1, matrix);
          }
        }
      }
      return matrix;
    };

    Movable.prototype.moveTo = function(x, y) {
      var blocked, lastPos, res, results,
        _this = this;
      results = this.findShortestPathTo(x, y);
      lastPos = results[results.length - 1];
      if (lastPos && !level.canMoveTo(lastPos.x, lastPos.y)) results.pop();
      blocked = false;
      res = results[0];
      if (!res) return;
      level.queue(function() {
        var firstStep, lastStep, proposedPath, step, _i, _len, _ref;
        if (!level.canMoveTo(res.x, res.y)) {
          blocked = true;
          proposedPath = _this.findShortestPathTo(x, y, true);
          lastStep = proposedPath[proposedPath.length - 1];
          if (lastStep && !level.canMoveTo(lastStep.x, lastStep.y)) {
            proposedPath.pop();
          }
          if (firstStep = proposedPath[0]) {
            if (level.canMoveTo(firstStep.x, firstStep.y)) {
              res.x = firstStep.x;
              res.y = firstStep.y;
              blocked = false;
            }
          } else {
            _ref = results.reverse();
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              step = _ref[_i];
              proposedPath = _this.findShortestPathTo(step.x, step.y, true);
              lastStep = proposedPath[proposedPath.length - 1];
              if (lastStep && !level.canMoveTo(lastStep.x, lastStep.y)) {
                proposedPath.pop();
              }
              if (firstStep = proposedPath[0]) {
                if (level.canMoveTo(firstStep.x, firstStep.y)) {
                  res.x = firstStep.x;
                  res.y = firstStep.y;
                  blocked = false;
                  break;
                }
              }
            }
          }
        }
        if (_this.apLeft <= 0 || blocked) return;
        _this.subtractAp(1);
        _this.getElem().unbind('click');
        _this.updateInfo();
        _this.hide();
        _this.x = res.x;
        _this.y = res.y;
        _this.characterSelected();
        _this.show();
        if (!(_this.x === x && _this.y === y)) return _this.moveTo(x, y);
      }).queue(2);
      return results;
    };

    return Movable;

  })();

}).call(this);
