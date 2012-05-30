/* DO NOT MODIFY. This file was compiled Wed, 30 May 2012 20:17:09 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/level/map.coffee
 */

(function() {

  RPG.Level.Map = (function() {

    function Map(opts) {
      var _this = this;
      if (opts == null) opts = {};
      this.width = opts.width || 410;
      this.height = opts.height || 816;
      this.terrainMatrix = new RPG.Level.Matrix(opts.terrain);
      if (!this.terrainMatrix) throw "Error: You must provide a terrain matrix";
      this.rowCount = this.terrainMatrix.rowCount;
      this.colCount = this.terrainMatrix.colCount;
      this.backgroundImage = opts.backgroundImage;
      this.cellTemplate = $(opts.cellTemplate || '<span class="cell"></span>');
      this.cellTypes = opts.cellTypes || ['map', 'underlay', 'item', 'enemy', 'player', 'stat', 'overlay'];
      $(function() {
        _this.wrapper = $('#wrapper');
        _this.template = _this.wrapper.html();
        _this.info = $(opts.infoSelector || '#info');
        _this.elem = $(opts.selector || '#map');
        _this.setStyles();
        _this.createCells();
        return _this.bindClicked();
      });
    }

    Map.prototype.setStyles = function() {
      this.elem.hide().css({
        height: "" + this.height + "px",
        width: "" + this.width + "px"
      }).show();
      return this.info.css('height', "" + this.height + "px");
    };

    Map.prototype.createCells = function() {
      var cell, cellType, mapCells, _i, _j, _len, _len2, _ref, _results,
        _this = this;
      _ref = this.cellTypes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cellType = _ref[_i];
        this["" + cellType + "Matrix"] = RPG.Level.Matrix.newFilledMatrix(this.rowCount, this.colCount);
      }
      mapCells = [];
      this.terrainMatrix.each(function(x, y) {
        return mapCells.push(_this.calculateCells(x, y));
      });
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
      clone = this.cellTemplate.clone();
      return clone.addClass(type).attr('title', "" + x + ", " + y).attr('id', "" + type + "-cell-" + x + "-" + y);
    };

    Map.prototype.add = function(obj) {
      if (obj.addedToLevel) return obj.addedToLevel();
    };

    Map.prototype.getElem = function(obj) {
      if (obj.isTypeOf('Player')) {
        return this.playerMatrix.get(obj.x, obj.y);
      } else if (obj.isTypeOf('Enemy')) {
        return this.enemyMatrix.get(obj.x, obj.y);
      }
    };

    Map.prototype.occupiedAt = function(x, y) {
      var _ref, _ref2;
      return ((_ref = this.playerMatrix.get(x, y)) != null ? _ref.hasClass('occupied') : void 0) || ((_ref2 = this.enemyMatrix.get(x, y)) != null ? _ref2.hasClass('occupied') : void 0);
    };

    Map.prototype.canMoveTo = function(x, y) {
      return this.canWalkOn(x, y) && !this.occupiedAt(x, y);
    };

    Map.prototype.canWalkOn = function(x, y) {
      return this.terrainMatrix.get(x, y) <= 10;
    };

    Map.prototype.canAttack = function(x, y) {
      var _ref;
      return this.occupiedAt(x, y) && ((_ref = this.enemyMatrix.get(x, y)) != null ? _ref.hasClass('occupied') : void 0);
    };

    Map.prototype.showCellAs = function(type, x, y) {
      return this.underlayMatrix.get(x, y).addClass(type);
    };

    Map.prototype.hideCellAs = function(type, x, y) {
      return this.underlayMatrix.get(x, y).removeClass(type);
    };

    Map.prototype.hideCellAs = function(type, x, y) {
      return this.underlayMatrix.get(x, y).removeClass(type);
    };

    Map.prototype.clear = function(x, y) {
      var classes;
      classes = 'passable impassable movable attackable healable';
      if (x && y) {
        return this.underlayMatrix.get(x, y).removeClass(classes);
      } else {
        return this.underlayMatrix.each(function(x, y, elem) {
          return elem != null ? elem.removeClass(classes) : void 0;
        });
      }
    };

    Map.prototype.bindClicked = function() {
      var _this = this;
      return this.elem.bind('click', function(e) {
        return _this.handleMapClicked(e);
      });
    };

    Map.prototype.handleMapClicked = function(e) {
      var char, classes, underlayCell, x, y, _ref, _ref2, _ref3, _ref4, _ref5;
      if ((_ref = level.activeCharacter) != null ? _ref.isTypeOf('Enemy') : void 0) {
        return;
      }
      _ref2 = $(e.target).getMatrixCoords(), x = _ref2[0], y = _ref2[1];
      underlayCell = this.underlayMatrix.get(x, y);
      classes = _(underlayCell.attr('class').split(' '));
      if (classes.include('impassable') || classes.include('passable') && !(classes.include('attackable') || classes.include('healable'))) {
        this.clear();
        if (char = RPG.Character.findByPosition(x, y)) {
          if (char.isTypeOf('Enemy')) {
            char.centerMapOnMe();
          } else {
            char.characterSelected(true);
          }
        }
        return;
      }
      if (classes.include('attackable') && this.canAttack(x, y)) {
        if ((_ref3 = level.activeCharacter) != null) _ref3.attack(x, y);
      }
      if (this.playerMatrix.get(x, y).hasClass('occupied') && !classes.include('attackable') && !classes.include('healable')) {
        if ((_ref4 = RPG.Character.findByPosition(x, y)) != null) {
          _ref4.characterSelected();
        }
      }
      if (classes.include('movable')) {
        return (_ref5 = level.activeCharacter) != null ? _ref5.moveTo(x, y) : void 0;
      }
    };

    return Map;

  })();

}).call(this);
