function Level(){
  this.map = new Map([ 
    [ 10, 10, 10, 10, 10, 10, 10 ], 
    [ 10, 15, 15, 10, 10, 10, 10 ], 
    [ 10, 10, 10, 10, 10, 10, 10 ], 
    [ 10, 10, 15, 10, 10, 10, 10 ], 
    [ 10, 10, 15, 10, 15, 15, 10 ],
    [ 10, 10, 10, 10, 10, 15, 10 ],
    [ 10, 10, 10, 10, 10, 10, 10 ],
    [ 10, 10, 10, 10, 10, 10, 10 ] 
  ]);
  this.info_div = $('#info');
  
  this.players_have_gone = false;
  this.enemies_have_gone = false;
};

Level.prototype = {
  show_current_turn: function(){
    if ( this.active_player )
      this.players_have_gone = this.active_player.has_gone();
    
    if ( this.active_enemy )
      this.enemies_have_gone = this.active_enemy.has_gone();
    else
      this.enemies_have_gone = true;
    
    if ( this.players_have_gone && this.enemies_have_gone && this.active_player ) {
      this.reset_turn();
    } else if ( this.players_have_gone ) {
      this.info_div.html('<p>Enemy Turn</p>');
      this.activate_enemy();
    }
  },
  activate_enemy: function(){
    var enemy = this.active_enemy;
    setTimeout(function(){ enemy.calculate_turn(), 2000 } )
  },
  reset_turn: function(){
    this.active_player.ap_left = this.active_player.ap;
    
    if( level.active_enemy ){
      this.active_enemy.has_moved = false;
      this.active_enemy.has_attacked = false;
      this.enemies_have_gone = false;
    } else {
      this.enemies_have_gone = true;
    }
    
    this.players_have_gone = false;
    this.info_div.html('<p>Player Turn</p>');
    this.active_player.bind_events();
  },
  distribute_exp: function(amt){
    var chars = this.characters;
    for(var i = chars.length - 1; i >= 0; i--)
      chars[i].add_exp(amt);
  },
  remove_enemy: function(enemy){
    var chars = level.enemies;
    var to_remove;
    
    for (var i = chars.length - 1; i >= 0; i--)
      if( chars[i].x == enemy.x && chars[i].y == enemy.y ){
        to_remove = chars.splice(i, 1)
        this.active_enemy = null;
      }
  },
  remove_player: function(player){
    var chars = level.characters;
    var to_remove;

    for (var i = chars.length - 1; i >= 0; i--)
      if( chars[i].x == player.x && chars[i].y == player.y ){
        to_remove = chars.splice(i, 1)
        this.active_player = null;
      }
    
    if ( chars.length == 0 )
      this.game_over();
  },
  game_over: function(){
    alert('You have fallen in battle...');
    $('#map, #info').fadeOut(6000, function(){
      location.reload(true);
    });
  }
};