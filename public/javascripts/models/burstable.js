/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:07 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/models/burstable.coffee
 */

(function() {

  RPG.Burstable = (function() {

    function Burstable(opts) {
      if (opts == null) opts = {};
      this.type = opts.type || 'attackable';
      this.onHover = opts.onHover;
      this.activated = opts.activated || function(x, y) {
        return level.log("activated at " + x + "," + y);
      };
    }

    Burstable.prototype.showArea = function() {
      var _this = this;
      level.map.underlayMatrix.each(function(x, y, elem) {
        elem.unbind('click');
        elem.one('click', function(e) {
          var targ, _ref;
          targ = $(e.target);
          if (targ.hasClass('overlay')) {
            _ref = targ.getMatrixCoords(), x = _ref[0], y = _ref[1];
            _this.activated(x, y);
            e.stopPropagation();
            return $('body').trigger('click');
          }
        });
        if (_this.onHover) {
          elem.on('mouseover', function() {
            return _this.onHover(x, y);
          });
          return elem.on('mouseout', function() {
            return level.clear();
          });
        }
      });
      return $('body').one('click', function(e) {
        return level.map.underlayMatrix.each(function(x, y, elem) {
          elem.unbind('mouseover').unbind('mouseout');
          return elem.unbind('click');
        });
      });
    };

    Burstable.prototype.smallBurstShape = function(x, y) {
      var _this = this;
      return level.map.underlayMatrix.each(function(x2, y2, el) {
        if (_([Math.abs(x - x2), Math.abs(y - y2)]).max() < 2) {
          return el.addClass(_this.type);
        }
      });
    };

    return Burstable;

  })();

}).call(this);
