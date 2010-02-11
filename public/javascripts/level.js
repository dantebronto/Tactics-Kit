var Level = Class.extend({
  init: function(opts){
    this.map = opts.map;
    this.info_div = $('#info');
    this.info_div.css('left', this.map.div.width() + 15);
    this.animation_speed = 0.5;
    this.animation_queue = [];
    this.turn = 1;
    this.turn_function = function(){};
    this.highest_id = 0;
    this.draw();
  },
  draw: function(){
    var self = this;
    if ( typeof(self.animation_queue[0]) == 'function' )
      self.animation_queue[0]();
    self.animation_queue.shift(); 
    setTimeout(function(){ self.draw(); }, 500 * self.animation_speed);
  },
  show_current_turn: function(){
    this.active_enemy = this.next_active_enemy();
    this.active_player = this.next_active_player();
    
    if ( !this.active_player && !this.active_enemy ) {
      this.reset_turn();
    } else if ( !this.active_player ) {
      this.active_enemy.calculate_turn(); // activate next enemy
      this.info_div.html('<p>Enemy Turn</p>');
      this.show_stats('players');
    }
  },
  reset_turn: function(){
    this.restore_players();    
    this.restore_enemies();
    this.activate_players();
    this.turn += 1;
    this.turn_function();
    this.info_div.html('<p>Player Turn</p>');
    this.show_stats('players');
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
      if ( !this.enemies[i].has_gone )
        return this.enemies[i];
  },
  next_active_player: function(){
    for( var i=0; i < this.players.length; i++ )
      if ( !this.players[i].has_gone() )
        return this.players[i];
  },
  restore_enemies: function(){
    for( var i=this.enemies.length - 1; i >= 0; i-- )
      this.enemies[i].has_gone = false;
  },
  restore_players: function(){
    for( var i=this.players.length - 1; i >= 0; i-- )
      this.players[i].ap_left = this.players[i].ap;
  },
  activate_players: function(){
    for( var i=this.players.length - 1; i >= 0; i-- )
      this.players[i].bind_events();
  },
  assign_ids: function(){
    var chars = this.enemies.concat(this.players);
    for( var i=0; i < chars.length; i++ ){
      chars[i].level_id = i;
      this.higest_id = i;
    }
  },
  show_stats: function(type, the_id){
    var chars = type == 'players' ? this.players : this.enemies;
    
    var stats = $('#info #stats_list');
    
    if( !stats.length )
      stats = $('<div></div>').attr('id', 'stats_list').appendTo(level.info_div);
    
    var ul, they;
    stats.html('');
    
    for( var i=0; i < chars.length; i++ ){
      they = chars[i];
      
      ul = '<ul id=stats_' + they.level_id + '>';
      ul += '<li>Name: ' + they.name     + '</li>';
      ul += '<li>HP: '   + they.hp_left  + '/' + they.hp + '</li>';
      if ( they.is_player ){
        if ( they.ap_left >= 1 )
          ul += '<li>AP: <b>'   + they.ap_left  + '</b>/' + they.ap + '</li>';
        else
          ul += '<li>AP: '   + they.ap_left  + '/' + they.ap + '</li>';
      }
        
      ul += '<li>ST: '   + they.strength + '</li>';
      ul += '<li>SP: '   + they.speed    + '</li>';
      ul += '</ul>';
      
      ul = $(ul);
      if ( the_id == they.level_id )
        ul.addClass('selected');
        
      stats.append(ul);
    }
  }  
});