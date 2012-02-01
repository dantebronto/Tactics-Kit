/* DO NOT MODIFY. This file was compiled Wed, 01 Feb 2012 23:32:07 GMT from
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
      matrix = this.findNeighbors(this.x, this.y, matrix, speed - 1);
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
    Moveable.prototype.findNeighbors = function(x, y, matrix, speed, attacking) {
      var i, levelFn, surrounds;
      if (attacking == null) {
        attacking = false;
      }
      surrounds = [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y + 1], [x - 1, y], [x - 1, y - 1]];
      levelFn = attacking ? 'canAttack' : 'canMoveTo';
      for (i = 0; i <= 7; i++) {
        x = surrounds[i][0];
        y = surrounds[i][1];
        if (level[levelFn](x, y)) {
          matrix.set(x, y, 1);
          if (speed > 0) {
            matrix = this.findNeighbors(x, y, matrix, speed - 1, attacking);
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
          this.bindElemClicked();
          this.characterSelected();
          return this.show();
        }, this));
      }, this));
      return level.animate();
    };
    return Moveable;
  })();
}).call(this);
