var Level = Class.extend({
  init: function(opts){
    this.map = opts.map;
    this.info_div = $('#info');
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
    
    if ( level.enemies.length == 0 )
      this.next();
    
    if ( !this.active_player && !this.active_enemy ) {
      this.reset_turn();
    } else if ( !this.active_player ) {
      this.active_enemy.calculate_turn(); // activate next enemy
      
      // this.info_div.html('<p>Enemy Turn</p>');
      // this.show_stats('players');
    }
  },
  reset_turn: function(){
    this.restore_players();    
    this.restore_enemies();
    this.activate_players();
    this.turn += 1;
    this.turn_function();
    
    // this.info_div.html('<p>Player Turn</p>');
    // this.show_stats('players');
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
    
    var close_stats = $('<a href="javascript:void(0)" id="close_stats">close</a>');
    close_stats.one('click', function(){ level.info_div.hide(); $('#info_toggles').show(); });
    
    level.info_div.html(close_stats);
    
    var chars = type == 'players' ? this.players : this.enemies;

    var stats = $('#stats_list');
    
    if( !stats.length )
      stats = $('<div></div>').attr('id', 'stats_list').appendTo(level.info_div);
    
    var ul, they, total_str;
    
    for( var i=0; i < chars.length; i++ ){
      they = chars[i];
      total_str = (Number(they.strength) + Number(they.weapon.attack));
      
      ul  = '<ul id=stats_' + they.level_id + '>';
      ul += '<li>Name: ' + they.name     + '</li>';
      ul += '<li>HP: '   + they.hp_left  + '/' + they.hp + '</li>';
      if ( they.is_player ){
        if ( they.ap_left >= 1 )
          ul += '<li>AP: <b>'   + they.ap_left  + '</b>/' + they.ap + '</li>';
        else
          ul += '<li>AP: '   + they.ap_left  + '/' + they.ap + '</li>';
      }
      
      ul += '<li>ST: '   + total_str     + '</li>';
      ul += '<li>SP: '   + they.speed    + '</li>';
      ul += '<li>LVL: '  + they.level    + '</li>';
      ul += '</ul>';
      
      ul = $(ul);
      if ( the_id == they.level_id )
        ul.addClass('selected');
        
      stats.append(ul);
    }
  },
  save_party: function(){
    if ( localStorage ){
      localStorage.inventory = JSON.stringify(level.players[0].inventory);
      $.each(level.players, function(){ this.map = null }); // remove circular reference
      localStorage.players = JSON.stringify(level.players);
    }
  },
  load_party: function(positions){
    
    var inventory, catan, claudia, players, pos;
    
    if ( typeof positions == 'undefined' ){ positions = [ { x: 4, y: 3 }, { x: 3, y: 3 } ]; }
    
    if ( localStorage && localStorage.players ){
      
      inventory = new Inventory(JSON.parse(localStorage.inventory));
      players = JSON.parse(localStorage.players);
      level.players = [];
      
      $.each(players, function(){
        pos = positions.pop();
        this.x = pos.x;
        this.y = pos.y;
        this.map = level.map;
        this.inventory = inventory;
        level.players.push(new Character(this));
      });
      level.active_player = level.players[0];
      
    } else { // create a new party, none stored 
      
      inventory = new Inventory( [ ['Potion', 3] ] );
      pos = positions.pop();
      catan = new Character({ map: level.map, x: pos.x, y: pos.y });
      pos = positions.pop();
      claudia = new Character({ 
        sprite: '/images/girl.gif', name: 'Claudia', 
        weapon: new Weapon({ range: 3, attack: 1, is_ranged: true, dead_range: 1, name: 'Weak Bow' }),
        hp: 45, map: level.map, x: pos.x, y: pos.y,
      });
      claudia.inventory = inventory;
      catan.inventory = inventory;
      level.players = [catan, claudia];
      level.active_player = level.players[0];
    }
  },
  next: function(){
    this.end_function();
    this.save_party();
    
    var current_level = Number(location.pathname.replace('/', '').replace('.html', ''));
    if( isNaN(current_level) ){ current_level = 1; }
    if( current_level + 1 > 2 ){ return false; }
    
    window.location = String(current_level + 1) + '.html';
  },
  load_info_toggles: function(){
    $('#info_toggles').show();
    $('#player_info_toggle').bind('click', function(){
      $('#info_toggles').hide();
      level.show_stats('players');
      level.info_div.show()
    });
    $('#enemy_info_toggle').bind('click', function(){
      $('#info_toggles').hide();
      level.show_stats('enemies');
      level.info_div.show();
    });
  }
});