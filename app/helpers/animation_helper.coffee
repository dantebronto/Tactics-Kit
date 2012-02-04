class AnimationHelper
  
  # Amount of shakes, Shake distance, Time duration
  # $.fn.shake = (intShakes, intDistance, intDuration) ->
  #   @each ->
  #     elem = $(this)
  #     elem.css position:'relative'
  #     for x in intShakes
  #       elem.animate({left: intDistance*-1 }, (((intDuration/intShakes)/4)))
  #       .animate({left:intDistance}, ((intDuration/intShakes)/2))
  #       .animate({left:0}, (((intDuration/intShakes)/4)))
  #   this
  
  `
  $.fn.shake = function ( times, distance, duration, callback ) {
      return this.css({ position: 'relative' }).each( function () {            
          for ( var i = 0, t = duration / times; i < times; i+= 1 ) {
              $( this ).
                  animate({ left: -distance }, t / 3 ).
                  animate({ left:  distance }, t / 3 ).
                  animate({ left:         0 }, t / 4 );
          }

          $( this ).show( callback );
      });
  };
  `