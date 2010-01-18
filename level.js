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
    this.players_have_gone = this.active_player.has_gone();
    this.enemies_have_gone = this.active_enemy.has_gone();
    
    if ( this.players_have_gone && this.enemies_have_gone ) {
      this.reset_turn();
    } else if ( this.players_have_gone ) {
      this.info_div.html('<p>Enemy Turn</p>');
      this.activate_enemy();
    }
  },
  activate_enemy: function(){
    var enemy = this.active_enemy;
    setTimeout(function(){ enemy.calculate_turn(), 1000 } )
  },
  reset_turn: function(){
    this.active_player.ap_left = this.active_player.ap;
    this.active_enemy.has_moved = false;
    this.active_enemy.has_attacked = false;
    this.players_have_gone = false;
    this.enemies_have_gone = false;
    this.info_div.html('<p>Player Turn</p>');
    this.active_player.bind_events();
  }
};