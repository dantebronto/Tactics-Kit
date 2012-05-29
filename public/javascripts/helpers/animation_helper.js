/* DO NOT MODIFY. This file was compiled Tue, 29 May 2012 21:55:08 GMT from
 * /Users/kellenpresley/source/tactics-engine/app/helpers/animation_helper.coffee
 */

(function() {
  var AnimationHelper;

  AnimationHelper = (function() {

    function AnimationHelper() {}

    
  $.fn.shake = function ( times, distance, duration, callback, offset ) {
    return this.each( function () {
        if (!offset) offset = 0;
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

  new AnimationHelper();

}).call(this);
