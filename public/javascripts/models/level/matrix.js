(function() {
  Level.Matrix = (function() {
    Matrix.distance = function(p1, p2, q1, q2) {
      var t1, t2;
      t1 = Math.pow(p1 - q1, 2);
      t2 = Math.pow(p2 - q2, 2);
      console.log(t1, t2);
      return Math.sqrt(t1 + t2);
    };
    Matrix.newFilledMatrix = function(rowCount, colCount, value) {
      var ara, row, x, y, _ref, _ref2;
      if (rowCount == null) {
        rowCount = 0;
      }
      if (colCount == null) {
        colCount = 0;
      }
      if (value == null) {
        value = 0;
      }
      ara = [];
      for (x = 0, _ref = rowCount - 1; (0 <= _ref ? x <= _ref : x >= _ref); (0 <= _ref ? x += 1 : x -= 1)) {
        row = new Array(colCount);
        for (y = 0, _ref2 = colCount - 1; (0 <= _ref2 ? y <= _ref2 : y >= _ref2); (0 <= _ref2 ? y += 1 : y -= 1)) {
          row[y] = value;
        }
        ara.push(row);
      }
      return new Level.Matrix(ara);
    };
    function Matrix(raw) {
      this.raw = raw;
      this.rowCount = this.raw.length;
      this.colCount = this.raw[0].length;
      this;
    }
    Matrix.prototype.get = function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if ((this.raw[x] != null) && (this.raw[y][x] != null)) {
        return this.raw[y][x];
      }
    };
    Matrix.prototype.set = function(x, y, value) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (value == null) {
        value = 0;
      }
      this.raw[y][x] = value;
      return value;
    };
    Matrix.prototype.debug = function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.rowCount - 1; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        _results.push(console.log(this.raw[i]));
      }
      return _results;
    };
    Matrix.prototype.row = function(index) {
      if (index == null) {
        index = 0;
      }
      return this.raw[index];
    };
    Matrix.prototype.col = function(index) {
      var col, i, _ref;
      if (index == null) {
        index = 0;
      }
      col = [];
      for (i = 0, _ref = this.rowCount - 1; (0 <= _ref ? i <= _ref : i >= _ref); (0 <= _ref ? i += 1 : i -= 1)) {
        col.push(this.raw[i][index]);
      }
      return col;
    };
    Matrix.prototype.each = function(fn) {
      var x, y, _ref, _results;
      _results = [];
      for (y = 0, _ref = this.rowCount - 1; (0 <= _ref ? y <= _ref : y >= _ref); (0 <= _ref ? y += 1 : y -= 1)) {
        _results.push((function() {
          var _ref, _results;
          _results = [];
          for (x = 0, _ref = this.colCount - 1; (0 <= _ref ? x <= _ref : x >= _ref); (0 <= _ref ? x += 1 : x -= 1)) {
            _results.push(fn.call(this.get(x, y), x, y));
          }
          return _results;
        }).call(this));
      }
      return _results;
    };
    return Matrix;
  })();
}).call(this);
