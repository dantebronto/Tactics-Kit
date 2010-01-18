function copy_prototype(descendant, parent) {
  var sConstructor = parent.toString();
  var aMatch = sConstructor.match( /\s*function (.*)\(/ );
  if ( aMatch != null ) { descendant.prototype[aMatch[1]] = parent; }
  for (var m in parent.prototype) {
    descendant.prototype[m] = parent.prototype[m];
  }
};

// Amount of shakes, Shake distance, Time duration
jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
  this.each(function() {
    $(this).css({position:'relative'});
    for (var x=1; x<=intShakes; x++) {
      $(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
      .animate({left:intDistance}, ((intDuration/intShakes)/2))
      .animate({left:0}, (((intDuration/intShakes)/4)));
    }
  });
  return this;
};

$(document).ready(function(){
  window['level'] = new Level();
  
  $('#stage').hide().fadeIn(2000, function(){ 
    level.info_div.hide().fadeIn(500); 
    
    var hero = new Character( { map: level.map } );
    level.active_player = hero;

    var enemy = new Enemy( { map: level.map } );
    level.active_enemy = enemy;

    level.reset_turn(); 
  });
});