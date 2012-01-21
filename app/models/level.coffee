class window.Level
  constructor: (opts) ->
    @turnFunction = opts.turnFunction or ->
    @endFunction = opts.endFunction or ->
    @map = new Level.Map opts.map

# class window.Level
#   constructor: (opts) ->
#     @map = opts.map
#     @info_div = $('#info')
#     @animation_speed = 0.5
#     @animation_queue = []
#     @turn = 1
#     @turn_function = ->
#     @highest_id = 0
#     @draw()
#   
#   next_active_enemy: ->
#     for enemy in @enemies
#       return enemy unless enemy.has_gone 
#   
#   next_active_player: ->
#     for player in @players
#       return player unless player.has_gone
#   
#   show_current_turn: ->
#     @active_enemy = @next_active_enemy()
#     @active_player = @next_active_player()
#     
#     @next() if level.enemies.length == 0
#     
#     if !@active_player and !@active_enemy
#       @reset_turn()
#     else if !@active_player
#       @active_enemy.calculate_turn() # activate next enemy
#   
#   load_info_toggles: ->
#     $('#info_toggles').show()
#     $('#player_info_toggle').bind 'click', ->
#       $('#info_toggles').hide()
#       level.show_stats('players')
#       level.info_div.show()
#     
#     $('#enemy_info_toggle').bind 'click', ->
#       $('#info_toggles').hide();
#       level.show_stats('enemies')
#       level.info_div.show()
#   
#   activate_players: -> player.bind_events() for player in @players
#   restore_enemies: -> enemy.has_gone = false for enemy in @enemies
#   restore_players: -> player.ap_left = player.ap for player in @players
#   
#   draw: ->
#     @animation_queue[0]() if typeof @animation_queue[0] == 'function'
#     @animation_queue.shift()
#     setTimeout((=> @draw()), 500 * @animation_speed) 
#   
#   assign_ids: ->
#     chars = @enemies.concat(@players);
#     for i in chars.length
#       chars[i].level_id = i
#       @higest_id = i
#   
#   load_party: (positions) ->
#     positions ?= [ { x: 4, y: 3 }, { x: 3, y: 3 } ]
#     
#     if localStorage and localStorage.players
#       
#       inventory = new Inventory(JSON.parse(localStorage.inventory))
#       players = JSON.parse(localStorage.players)
#       level.players = []
#       
#       $.each players, () ->
#         pos = positions.pop()
#         @x = pos.x
#         @y = pos.y
#         @map = level.map
#         @inventory = inventory
#         level.players.push(new Character(this))
#         
#         level.active_player = level.players[0]
#     else
#       # create a new party, none stored
#       inventory = new Inventory( [ ['Potion', 3] ] )
#       pos = positions.pop()
#       catan = new Character
#         map: level.map, x: pos.x, y: pos.y
#       pos = positions.pop()
#       claudia = new Character
#         sprite: '/images/girl.gif', name: 'Claudia'
#         hp: 45, map: level.map, x: pos.x, y: pos.y
#         weapon: new Weapon
#           range: 3, attack: 1, is_ranged: true, dead_range: 1, name: 'Weak Bow'
#       claudia.inventory = inventory
#       catan.inventory = inventory
#       level.players = [catan, claudia]
#       level.active_player = level.players[0]
#   
#   reset_turn: ->
#     @restore_players()
#     @restore_enemies()
#     @activate_players()
#     @turn += 1
#     @turn_function()
# 
# `var cuipl = Class.extend({
#   distribute_exp: function(amt){
#     var chars = this.players;
#     for(var i = chars.length - 1; i >= 0; i--)
#       chars[i].add_exp(amt);
#   },
#   remove_enemy: function(enemy){
#     var chars = level.enemies;
#     var to_remove;
#     
#     for (var i = chars.length - 1; i >= 0; i--)
#       if( chars[i].x == enemy.x && chars[i].y == enemy.y ){
#         to_remove = chars.splice(i, 1)
#         this.active_enemy = null;
#       }
#   },
#   remove_player: function(player){
#     var chars = level.players;
#     var to_remove;
# 
#     for (var i = chars.length - 1; i >= 0; i--)
#       if( chars[i].x == player.x && chars[i].y == player.y ){
#         to_remove = chars.splice(i, 1)
#         this.active_player = null;
#       }
#     
#     if ( chars.length == 0 )
#       this.game_over();
#   },
#   game_over: function(){
#     alert('You have fallen in battle...');
#     $('#map, #info').fadeOut(6000, function(){
#       location.reload(true);
#     });
#   },
#   show_stats: function(type, the_id){
#     
#     var close_stats = $('<a href="javascript:void(0)" id="close_stats">close</a>');
#     close_stats.one('click', function(){ level.info_div.hide(); $('#info_toggles').show(); });
#     
#     level.info_div.html(close_stats);
#     
#     var chars = type == 'players' ? this.players : this.enemies;
# 
#     var stats = $('#stats_list');
#     
#     if( !stats.length )
#       stats = $('<div></div>').attr('id', 'stats_list').appendTo(level.info_div);
#     
#     var ul, they, total_str;
#     
#     for( var i=0; i < chars.length; i++ ){
#       they = chars[i];
#       total_str = (Number(they.strength) + Number(they.weapon.attack));
#       
#       ul  = '<ul id=stats_' + they.level_id + '>';
#       ul += '<li>Name: ' + they.name     + '</li>';
#       ul += '<li>HP: '   + they.hp_left  + '/' + they.hp + '</li>';
#       if ( they.is_player ){
#         if ( they.ap_left >= 1 )
#           ul += '<li>AP: <b>'   + they.ap_left  + '</b>/' + they.ap + '</li>';
#         else
#           ul += '<li>AP: '   + they.ap_left  + '/' + they.ap + '</li>';
#       }
#       
#       ul += '<li>ST: '   + total_str     + '</li>';
#       ul += '<li>SP: '   + they.speed    + '</li>';
#       ul += '<li>LVL: '  + they.level    + '</li>';
#       ul += '</ul>';
#       
#       ul = $(ul);
#       if ( the_id == they.level_id )
#         ul.addClass('selected');
#         
#       stats.append(ul);
#     }
#   },
#   save_party: function(){
#     if ( localStorage ){
#       localStorage.inventory = JSON.stringify(level.players[0].inventory);
#       $.each(level.players, function(){ this.map = null }); // remove circular reference
#       localStorage.players = JSON.stringify(level.players);
#     }
#   },
#   load_party: function(positions){
#     
#     var inventory, catan, claudia, players, pos;
#     
#     if ( typeof positions == 'undefined' ){ positions = [ { x: 4, y: 3 }, { x: 3, y: 3 } ]; }
#     
#     if ( localStorage && localStorage.players ){
#       
#       inventory = new Inventory(JSON.parse(localStorage.inventory));
#       players = JSON.parse(localStorage.players);
#       level.players = [];
#       
#       $.each(players, function(){
#         pos = positions.pop();
#         this.x = pos.x;
#         this.y = pos.y;
#         this.map = level.map;
#         this.inventory = inventory;
#         level.players.push(new Character(this));
#       });
#       level.active_player = level.players[0];
#       
#     } else { // create a new party, none stored 
#       
#       inventory = new Inventory( [ ['Potion', 3] ] );
#       pos = positions.pop();
#       catan = new Character({ map: level.map, x: pos.x, y: pos.y });
#       pos = positions.pop();
#       claudia = new Character({ 
#         sprite: '/images/girl.gif', name: 'Claudia', 
#         weapon: new Weapon({ range: 3, attack: 1, is_ranged: true, dead_range: 1, name: 'Weak Bow' }),
#         hp: 45, map: level.map, x: pos.x, y: pos.y,
#       });
#       claudia.inventory = inventory;
#       catan.inventory = inventory;
#       level.players = [catan, claudia];
#       level.active_player = level.players[0];
#     }
#   },
#   next: function(){
#     this.end_function();
#     this.save_party();
#     
#     var current_level = Number(location.pathname.replace('/', '').replace('.html', ''));
#     if( isNaN(current_level) ){ current_level = 1; }
#     if( current_level + 1 > 2 ){ return false; }
#     
#     window.location = String(current_level + 1) + '.html';
#   },
# });`