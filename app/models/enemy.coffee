class window.Enemy extends Character
  constructor: (opts) ->
    super(opts)
  
  addedToLevel: ->
    @drawInfo()
    @initSprite()
    @trigger 'create'
    @info.find('button').hide()
  
    # // var enemy_level_id = 99;
    # // 
    # // var Enemy = Character.extend({
    # //   init: function(opts){
    # //     this.movement_queue = [];
    # //     this.attack_queue = [];
    # //     this.attacking = {}; // a character
    # //     this.has_gone = false;
    # //     this.show();
    # //   },
    # //   calculate_turn: function(){
    # //     var self = this;
    # //     self.set_movement_queue();
    # //     self.set_attack_queue();
    # //     self.queue_animations();
    # //   },
    # //   die: function(){
    # //     this.remove_from_map();
    # //     level.distribute_exp(this.exp);
    # //     level.remove_enemy(this);
    # //   },
    # //   highlight_attack: function(){
    # //     var self = this;
    # //     var attack_matrix = self.get_attack_matrix();
    # // 
    # //     attack_matrix.each(function(x, y){
    # //       if( this.e(x, y) == 1 ){
    # //         self.map.underlay_cell(x, y)
    # //           .addClass('attackable pointer');
    # //       }
    # //     });
    # //   },
    # //   highlight_movement: function(){
    # //     var self = this;
    # //     var x = self.x;
    # //     var y = self.y;
    # //     var speed = self.speed;
    # //     
    # //     matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
    # //     matrix = self.find_neighbors({
    # //       x: x, y: y,
    # //       matrix: matrix,
    # //       speed: speed
    # //     });
    # //     
    # //     matrix.set(x, y, 0);
    # //     
    # //     matrix.each(function(x, y){ 
    # //       if( this.e(x, y) == 1 ){        
    # //         self.map.underlay_cell(x, y)
    # //           .addClass('moveable pointer');
    # //       }
    # //     });
    # //   },
    # //   queue_animations: function(){
    # //     var self = this;
    # //     var q = level.animation_queue;
    # //     var attk_q = self.attack_queue;
    # //     var mvmt_q = self.movement_queue;
    # //     var has_attacked = false;
    # //     var x, y;
    # //     
    # //     var no_attk = true;
    # //     for( var i=0; i < attk_q.length; i++ )
    # //       if( attk_q[i] )
    # //         no_attk = false;
    # //     
    # //     var can_attk = self.target_in_range();
    # //     
    # //     if( no_attk && can_attk ){
    # //       q.push(function(){ self.highlight_attack(); } );
    # //       q.push('rest');
    # //       q.push(function(){ 
    # //         self.map.remove_clickables(); 
    # //         self.map.underlay_cell(can_attk.x, can_attk.y).addClass('attackable pointer'); 
    # //       });
    # //       q.push(function(){
    # //         self.map.remove_clickables();
    # //         self.deal_damage(can_attk.x, can_attk.y);
    # //       });
    # //     } else {
    # //       q.push(function(){ self.highlight_movement(); });
    # //       q.push('rest');
    # //       q.push(function(){ self.map.remove_clickables(); });
    # // 
    # //       for( var i=0; i < mvmt_q.length; i++ ){  
    # //         x = self.movement_queue[i].x;
    # //         y = self.movement_queue[i].y;
    # //         q.push(function(){ 
    # //           self.remove_from_map();
    # //           self.x = self.movement_queue[0].x;
    # //           self.y = self.movement_queue[0].y;
    # //           self.movement_queue.shift();
    # //           self.show(); 
    # //         });
    # //         q.push('noop');
    # //         
    # //         if ( self.attack_queue[i] && !has_attacked ){
    # //           has_attacked = true;
    # //           self.attacking = { x: self.attack_queue[i].x, y: self.attack_queue[i].y };
    # //           q.push(function(){ self.highlight_attack(); } );
    # //           q.push('rest');
    # //           q.push(function(){ 
    # //             self.map.remove_clickables(); 
    # //             self.map.underlay_cell(self.attacking.x, self.attacking.y).addClass('attackable pointer'); 
    # //           });
    # //           q.push(function(){
    # //             self.map.remove_clickables();
    # //             self.deal_damage(self.attacking.x, self.attacking.y);
    # //           })
    # //         }
    # //       }
    # //     } // end no_attk first
    # //     q.push(function(){ self.has_gone = true; level.show_current_turn(); });
    # //     q.push('rest');
    # //   },  
    # //   set_movement_queue: function(){
    # //     var self = this;
    # //     var weakest_player = self.target_player(); // find weakest player
    # //     var x = weakest_player.x;
    # //     var y = weakest_player.y;
    # //     
    # //     res = astar.search(self, self.map.terrain_matrix, 
    # //       { x: self.x, y: self.y }, { x: x, y: y });
    # //     
    # //     if ( res.length == 0 ){
    # //       for( var i=0; i < level.players.length; i++ ){
    # //         x = level.players[i].x;
    # //         y = level.players[i].y;
    # //         
    # //         if( res.length == 0 ){
    # //           res = astar.search(self, self.map.terrain_matrix, 
    # //             { x: self.x, y: self.y }, { x: x, y: y });
    # //         }
    # //       }
    # //     }
    # //     
    # //     // all moves within speed range  
    # //     res = res.splice(0, self.speed);
    # //     
    # //     var last = res[res.length-1];
    # //     
    # //     if( last && last.x == x && last.y == y )
    # //       res.pop(); // get within one space of the target, not on top of
    # //     
    # //     self.movement_queue = res;
    # //   },
    # //   target_in_range: function(x, y){
    # //     var self = this;
    # //     var am = self.get_attack_matrix({ x: x || self.x, y: y || self.y });
    # //     var player, weakest = { hp: 999999999 };
    # //     var target = false;
    # //     
    # //     am.each(function(x, y){
    # //       if( am.e(x, y) == 1 && self.map.player_cell(x, y).hasClass('occupied') ){
    # //         player = level.map.find_by_position('player', x, y);
    # //         weakest = weakest.hp < player.hp ? weakest : player;
    # //         target = { x: weakest.x, y: weakest.y };
    # //       }
    # //     });
    # //     return target;
    # //   },
    # //   target_player: function(){
    # //     var weakest_player = level.players[0];
    # //     for( var i=level.players.length - 1; i >= 0; i-- )
    # //       if ( level.players[i].hp_left < weakest_player.hp_left )
    # //         weakest_player = level.players[i];
    # //     return weakest_player;
    # //   }
    # // });