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
    
    var inventory = { 
      Potion: { 
        qty: 3, 
        use: function(used_by){
          used_by.hp_left += 25
          if ( used_by.hp_left > used_by.hp )
            used_by.hp_left = used_by.hp;
          level.show_stats('players', used_by.level_id);
        },
        toss: function(used_by){
          var speed = 3;
          
          matrix = Matrix.new_filled_matrix(used_by.map.rows, used_by.map.cols);
          matrix = used_by.find_neighbors({
            x: used_by.x, y: used_by.y,
            matrix: matrix,
            speed: speed
          });

          matrix.each(function(x, y){ 
            if( this.e(x, y) == 1 ){        
              used_by.map.underlay_cell(x, y)
                .addClass('healable pointer')
                .click(function(){
                  alert('throwing')
                });
            }
          });
        } 
      } 
    }
    
    var hero = new Character( { map: level.map, x:4, y: 12, inventory: inventory } );
    level.active_player = hero;
    
    //var bob = new Character( { map: level.map, x: 4, y: 3 })
    level.players = [hero]; //, bob];
    
    var foo = new Enemy( { map: level.map } );
    var bar = new Enemy( { map: level.map, x: 4, y: 14 } );
    
    level.active_enemy = foo;
    level.enemies = [foo, bar];
    
    level.assign_ids();
    level.reset_turn();
  });
});