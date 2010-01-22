function Level(){
  this.map = new Map([ 
    [ 15, 15, 15, 15, 15, 15, 15, 15 ], 
    [ 15, 15, 15, 15, 15, 15, 15, 15 ],
    [ 15, 15, 15, 15, 15, 15, 15, 15 ], 
    [ 15, 15, 15, 10, 10, 15, 15, 15 ], 
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 10, 10, 10, 10, 15, 15 ],
    [ 15, 15, 15, 15, 15, 15, 15, 15 ]
  ]);
  this.info_div = $('#info');
  this.animation_speed = 1.2;
};

Level.prototype = {
  show_current_turn: function(){
    this.active_enemy = this.next_active_enemy();
    this.active_player = this.next_active_player();
    
    if ( !this.active_player && !this.active_enemy ) {
      this.reset_turn();
    } else if ( !this.active_player ) {
      this.activate_enemy();
      this.info_div.html('<p>Enemy Turn</p>');
    }
  },
  activate_enemy: function(){
    var enemy = this.active_enemy;
    var timeout = 500 + (level.enemies.indexOf(enemy) * 750 * level.animation_speed);
    setTimeout(function(){ enemy.calculate_turn(); }, timeout);
  },
  reset_turn: function(){
    this.restore_players();    
    this.restore_enemies();
    this.activate_players();
    this.info_div.html('<p>Player Turn</p>');
  },
  distribute_exp: function(amt){
    var chars = this.players;
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
    var chars = level.players;
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
  },
  next_active_enemy: function(){
    for( var i=0; i < this.enemies.length; i++ )
      if ( !this.enemies[i].has_gone() )
        return this.enemies[i];
  },
  next_active_player: function(){
    for( var i=0; i < this.players.length; i++ )
      if ( !this.players[i].has_gone() )
        return this.players[i];
  },
  restore_enemies: function(){
    for( var i=this.enemies.length - 1; i >= 0; i-- ){
      this.enemies[i].has_moved = false;
      this.enemies[i].has_attacked = false;
    }
  },
  restore_players: function(){
    for( var i=this.players.length - 1; i >= 0; i-- )
      this.players[i].ap_left = this.players[i].ap;
  },
  activate_players: function(){
    for( var i=this.players.length - 1; i >= 0; i-- )
      this.players[i].bind_events();
  }
};