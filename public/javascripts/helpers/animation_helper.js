/* DO NOT MODIFY. This file was compiled Mon, 06 Feb 2012 03:33:37 GMT from
 * /Users/kellenpresley/source/rpgQuery/app/helpers/animation_helper.coffee
 */

(function() {
  var AnimationHelper;

  AnimationHelper = (function() {

    function AnimationHelper() {}

    
  $.fn.shake = function ( times, distance, duration, callback, offset ) {
    return this.each( function () {            
        for ( var i = 0, t = duration / times; i < times; i+= 1 ) {
            $( this ).
                animate({ left: offset - distance }, t / 3 ).
                animate({ left: offset + distance }, t / 3 ).
                animate({ left: offset            }, t / 4 );
        }
    
        $( this ).show( callback );
    });
  };
  ;

    return AnimationHelper;

  })();

}).call(this);
