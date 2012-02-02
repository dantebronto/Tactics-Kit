class AnimationHelper
  
  # Amount of shakes, Shake distance, Time duration
  $.fn.shake = (intShakes, intDistance, intDuration) ->
    @each ->
      elem = $(this)
      elem.css position:'relative'
      for x in intShakes
        elem.animate({left: intDistance*-1 }, (((intDuration/intShakes)/4)))
        .animate({left:intDistance}, ((intDuration/intShakes)/2))
        .animate({left:0}, (((intDuration/intShakes)/4)))
    this
  