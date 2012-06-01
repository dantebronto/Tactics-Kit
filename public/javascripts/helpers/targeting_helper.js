/* DO NOT MODIFY. This file was compiled Fri, 01 Jun 2012 13:34:22 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/helpers/targeting_helper.coffee
 */

(function() {

  RPG.TargetingHelper = {};

  RPG.TargetingHelper.closest = function(toMe) {
    var araToCheck, sorted,
      _this = this;
    araToCheck = toMe.isTypeOf('Player') ? level.enemies : level.players;
    sorted = _(araToCheck).sortBy(function(chard) {
      return toMe.chebyshevDistance(chard.x, chard.y);
    });
    return sorted[0];
  };

}).call(this);
