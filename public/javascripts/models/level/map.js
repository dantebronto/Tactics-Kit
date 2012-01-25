(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Level.Map = (function() {
    function Map(opts) {
      if (opts == null) {
        opts = {};
      }
      this.width = opts.width || 410;
      this.height = opts.height || 816;
      this.terrainMatrix = new Level.Matrix(opts.terrain);
      if (!this.terrainMatrix) {
        throw "Error: You must provide a terrain matrix";
      }
      this.rowCount = this.terrainMatrix.rowCount;
      this.colCount = this.terrainMatrix.colCount;
      this.backgroundImage = opts.backgroundImage || '/images/test-map.jpg';
      this.cellTemplate = opts.cellTemplate || $('<span class="cell"></span>');
      this.cellTypes = opts.cellTypes || ['map', 'underlay', 'item', 'enemy', 'player', 'stat', 'overlay'];
      $(__bind(function() {
        this.elem = $(opts.selector || '#map');
        this.setStyles();
        return this.createCells();
      }, this));
    }
    Map.prototype.setStyles = function() {
      return this.elem.css('height', "" + this.height + "px").css('width', "" + this.width + "px").css('background-image', "url(" + this.backgroundImage + ")");
    };
    Map.prototype.createCells = function() {
      var cell, cellType, mapCells, _i, _j, _len, _len2, _ref, _results;
      _ref = this.cellTypes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cellType = _ref[_i];
        this["" + cellType + "Matrix"] = Level.Matrix.newFilledMatrix(this.rowCount, this.colCount);
      }
      mapCells = [];
      this.terrainMatrix.each(__bind(function(x, y) {
        return mapCells.push(this.calculateCells(x, y));
      }, this));
      _results = [];
      for (_j = 0, _len2 = mapCells.length; _j < _len2; _j++) {
        cell = mapCells[_j];
        _results.push(cell.appendTo(this.elem));
      }
      return _results;
    };
    Map.prototype.calculateCells = function(x, y) {
      var cell, lastCell, mapCell, terrainType, type, _i, _len, _ref;
      terrainType = this.terrainMatrix.get(x, y);
      mapCell = null;
      lastCell = null;
      _ref = this.cellTypes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        cell = this.cellFromTemplate(x, y, type);
        this["" + type + "Matrix"].set(x, y, cell);
        if (type === this.cellTypes[0]) {
          mapCell = cell;
        } else {
          cell.appendTo(lastCell);
        }
        lastCell = cell;
      }
      return mapCell;
    };
    Map.prototype.cellFromTemplate = function(x, y, type) {
      return this.cellTemplate.clone().addClass(type).attr('id', "" + type + "-cell-" + x + "-" + y);
    };
    Map.prototype.add = function(obj) {
      return this.getElem(obj).addClass('pointer occupied').css('background', "url(" + obj.sprite + ") no-repeat center");
    };
    Map.prototype.getElem = function(obj) {
      if (obj.constructor === Player) {
        return this.playerMatrix.get(obj.x, obj.y);
      }
    };
    return Map;
  })();
}).call(this);
