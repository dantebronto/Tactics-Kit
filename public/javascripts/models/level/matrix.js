/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:08 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/level/matrix.coffee
 */

(function() {

  RPG.Level.Matrix = (function() {

    $.fn.getMatrixCoords = function() {
      var id, x, y, z, _ref;
      id = this.attr('id') ? this.attr('id') : this.parent().attr('id');
      _ref = id.split("-"), z = _ref[0], z = _ref[1], x = _ref[2], y = _ref[3];
      return [Number(x), Number(y)];
    };

    Matrix.distance = function(p1, p2, q1, q2) {
      var t1, t2;
      t1 = Math.pow(p1 - q1, 2);
      t2 = Math.pow(p2 - q2, 2);
      return Math.sqrt(t1 + t2);
    };

    Matrix.newFilledMatrix = function(rowCount, colCount, value) {
      var ara, row, x, y, _ref, _ref2;
      if (rowCount == null) rowCount = 0;
      if (colCount == null) colCount = 0;
      if (value == null) value = 0;
      ara = [];
      for (x = 0, _ref = rowCount - 1; 0 <= _ref ? x <= _ref : x >= _ref; 0 <= _ref ? x++ : x--) {
        row = new Array(colCount);
        for (y = 0, _ref2 = colCount - 1; 0 <= _ref2 ? y <= _ref2 : y >= _ref2; 0 <= _ref2 ? y++ : y--) {
          row[y] = value;
        }
        ara.push(row);
      }
      return new RPG.Level.Matrix(ara);
    };

    function Matrix(raw) {
      this.raw = raw;
      this.rowCount = this.raw.length;
      this.colCount = this.raw[0].length;
      this;
    }

    Matrix.prototype.get = function(x, y) {
      var _ref;
      if (x == null) x = 0;
      if (y == null) y = 0;
      if ((((_ref = this.raw) != null ? _ref[y] : void 0) != null) && (this.raw[y][x] != null)) {
        return this.raw[y][x];
      }
    };

    Matrix.prototype.set = function(x, y, value) {
      if (x == null) x = 0;
      if (y == null) y = 0;
      if (value == null) value = 0;
      this.raw[y][x] = value;
      return value;
    };

    Matrix.prototype.debug = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.rowCount - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        _results.push(console.log(this.raw[i]));
      }
      return _results;
    };

    Matrix.prototype.row = function(index) {
      if (index == null) index = 0;
      return this.raw[index];
    };

    Matrix.prototype.col = function(index) {
      var col, i, _ref;
      if (index == null) index = 0;
      col = [];
      for (i = 0, _ref = this.rowCount - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        col.push(this.raw[i][index]);
      }
      return col;
    };

    Matrix.prototype.each = function(fn) {
      var elem, x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = this.rowCount - 1; 0 <= _ref ? y <= _ref : y >= _ref; 0 <= _ref ? y++ : y--) {
        _results.push((function() {
          var _ref2, _results2;
          _results2 = [];
          for (x = 0, _ref2 = this.colCount - 1; 0 <= _ref2 ? x <= _ref2 : x >= _ref2; 0 <= _ref2 ? x++ : x--) {
            elem = this.get(x, y);
            _results2.push(fn.call(elem, x, y, elem));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    return Matrix;

  })();

}).call(this);
