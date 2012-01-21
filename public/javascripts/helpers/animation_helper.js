(function() {
  var AnimationHelper;
  AnimationHelper = (function() {
    function AnimationHelper() {}
    AnimationHelper.shake = function(intShakes, intDistance, intDuration) {
      this.each(function() {
        var elem, x, _i, _len, _results;
        elem = $(this);
        elem.css({
          position: 'relative'
        });
        _results = [];
        for (_i = 0, _len = intShakes.length; _i < _len; _i++) {
          x = intShakes[_i];
          _results.push(elem.animate({
            left: intDistance * -1
          }, (intDuration / intShakes) / 4).animate({
            left: intDistance
          }, (intDuration / intShakes) / 2).animate({
            left: 0
          }, (intDuration / intShakes) / 4));
        }
        return _results;
      });
      return this;
    };
    return AnimationHelper;
  })();
}).call(this);
