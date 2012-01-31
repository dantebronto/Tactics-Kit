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
        this.info = $(opts.infoSelector || '#info');
        this.elem = $(opts.selector || '#map');
        this.setStyles();
        this.createCells();
        return this.bindClicked();
      }, this));
    }
    Map.prototype.setStyles = function() {
      this.elem.hide().css({
        height: "" + this.height + "px",
        width: "" + this.width + "px",
        backgroundImage: "url(" + this.backgroundImage + ")"
      }).fadeIn('slow');
      return this.info.css('height', "" + this.height + "px");
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
      var clone;
      clone = $(this.cellTemplate[0].cloneNode(true));
      return clone.addClass(type).attr('id', "" + type + "-cell-" + x + "-" + y);
    };
    Map.prototype.add = function(obj) {
      if (obj.constructor === Player || obj.constructor === Enemy) {
        obj.show();
        return obj.addedToLevel();
      }
    };
    Map.prototype.remove = function(obj) {
      if (obj.constructor === Player) {
        return obj.hide();
      }
    };
    Map.prototype.getElem = function(obj) {
      if (obj.constructor === Player) {
        return this.playerMatrix.get(obj.x, obj.y);
      }
      if (obj.constructor === Enemy) {
        return this.enemyMatrix.get(obj.x, obj.y);
      }
    };
    Map.prototype.occupiedAt = function(x, y) {
      return this.playerMatrix.get(x, y).hasClass('occupied') || this.enemyMatrix.get(x, y).hasClass('occupied');
    };
    Map.prototype.canMoveTo = function(x, y) {
      return this.canWalkOn(x, y) && !this.occupiedAt(x, y);
    };
    Map.prototype.canWalkOn = function(x, y) {
      return this.terrainMatrix.get(x, y) <= 10;
    };
    Map.prototype.showCellAs = function(type, x, y) {
      return this.underlayMatrix.get(x, y).addClass(type);
    };
    Map.prototype.hideCellAs = function(type, x, y) {
      return this.underlayMatrix.get(x, y).removeClass(type);
    };
    Map.prototype.clear = function() {
      return this.underlayMatrix.each(function() {
        return this.removeClass('passable impassable moveable');
      });
    };
    Map.prototype.bindClicked = function() {
      return this.elem.bind('click', __bind(function(e) {
        return this.handleMapClicked(e);
      }, this));
    };
    Map.prototype.handleMapClicked = function(e) {
      var classes, overlayInfo, x, y, _ref;
      overlayInfo = e.target.id.split("-");
      x = Number(overlayInfo[2]);
      y = Number(overlayInfo[3]);
      classes = this.underlayMatrix.get(x, y).attr('class').split(' ');
      if (_(classes).include('impassable')) {
        this.clear();
        return;
      } else if (_(classes).include('passable')) {
        if (!this.playerMatrix.get(x, y).hasClass('occupied')) {
          this.clear();
          return;
        }
      }
      if (_(classes).include('moveable')) {
        return (_ref = level.activePlayer) != null ? _ref.moveTo(x, y) : void 0;
      }
    };
    return Map;
  })();
}).call(this);
