/* DO NOT MODIFY. This file was compiled Sun, 05 Feb 2012 20:22:40 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/helpers/animation_helper.coffee
 */

(function() {
  var AnimationHelper;

  AnimationHelper = (function() {

    function AnimationHelper() {}

    
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
  ;

    return AnimationHelper;

  })();

}).call(this);
