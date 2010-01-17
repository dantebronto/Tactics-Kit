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
  this.player_turn = true;
  
  var hero = new Character( { map: this.map } );
  this.active_character = hero;
  
  var enemy = new Enemy( { map: this.map } );
  this.active_enemy = enemy;
  
  this.show_current_turn();
};

Level.prototype = {
  show_current_turn: function(){
    
    if ( this.active_character.has_gone && this.active_enemy.has_gone ){
      this.active_character.has_gone = false;
      this.active_enemy.has_gone = false;
      this.player_turn = true;
      // next turn
    }
    
    if( this.active_character.has_gone )
      this.player_turn = false;
    
    if( this.active_enemy.has_gone )
      this.player_turn = true;
    
    if( this.player_turn ){
      this.info_div.html('player turn');
    } else {
      this.info_div.html('enemy turn');
      this.move_enemy();
    }
  },
  move_enemy: function(){
    var enemy = this.active_enemy;
    enemy.has_gone = 0;
    enemy.target_player();
  }
};