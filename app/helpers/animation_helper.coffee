class AnimationHelper
  `
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
  `

new AnimationHelper()