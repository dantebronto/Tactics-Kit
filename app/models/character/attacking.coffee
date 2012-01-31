class window.Attacking
  
  # showAttackableCells: ->
  #   return if @apLeft <= 0
  #   speed = @apLeft
  #   matrix = Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount
  #   matrix = @findNeighbors(@x, @y, matrix, speed-1)
  #   matrix.set @x, @y, 0
  #   matrix.each (x, y) ->
  #     if Number(this) == 1
  #       level.showCellAs('moveable', x, y)
  #     else
  #       type = if level.canWalkOn(x, y) then 'passable' else 'impassable'
  #       level.showCellAs(type, x, y)
  #       matrix
  
        # //   get_attack_matrix: function(opts){
        # //     if( !opts)
        # //       opts = {};
        # //     var self = this;
        # //     var x = opts.x || self.x;
        # //     var y = opts.y || self.y;
        # //     
        # //     matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
        # //     matrix = self.find_neighbors({
        # //       x: x, y: y,
        # //       matrix: matrix,
        # //       speed: self.weapon.range,
        # //       is_attacking: true
        # //     });
        # //     
        # //     if( self.weapon.is_ranged )
        # //       matrix = self.find_neighbors({
        # //         x: x, y: y,
        # //         matrix: matrix,
        # //         speed: self.weapon.dead_range,
        # //         fill_with: 0,
        # //         is_attacking: true
        # //       });
        # //     
        # //     matrix.set(x, y, 0);
        # //     
        # //     return matrix;
        # //   },
  
  initAttacking: ->
    
    # //   attack: function(x, y){
    # //     var self = this;
    # //     
    # //     if( self.ap_left < self.speed )
    # //       return; // not enough ap
    # //     
    # //     self.deal_damage(x, y);  
    # //     self.map.remove_clickables();
    # //     self.subtract_ap(self.speed);
    # //   },
    # //   bind_events: function(elem){
    # //     var self = this;
    # //     if( !elem )
    # //       elem = self.map.player_cell(self.x, self.y)
    # //     
    # //     elem
    # //       .haloContext(self, self.get_context_menu)
    # //       // .mouseover(function(){ level.show_stats('players', self.level_id)})
    # //       // .mouseout(function(){  level.show_stats('players'); })
    # //       .click(function(){
    # //         elem.unbind('mouseover');
    # // //        level.show_stats('players');
    # //         self.map.remove_clickables();
    # //       });
    # //   },
    # //   calculate_attack: function(battle){
    # //     var self = this;
    # //     var attack_matrix = self.get_attack_matrix();
    # //     
    # //     attack_matrix.each(function(x, y){
    # //       if( this.e(x, y) == 1 ){
    # //         self.map.underlay_cell(x, y)
    # //           .addClass('attackable pointer')
    # //           .click(function(){
    # //             if ( self.is_player )
    # //               if ( battle ){
    # //                 level.animation_queue.push(function(){ self.attack(x, y); });
    # //                 level.animation_queue.push('noop');
    # //                 level.animation_queue.push('noop');
    # //                 level.animation_queue.push(function(){ self.attack(x, y); });
    # //               } else {
    # //                 self.attack(x, y);
    # //               }
    # //           });
    # //       }
    # //     });
    # //   },
    # //   deal_damage: function(x, y){
    # //     var hits;
    # //     var dmg = 0;
    # //     var miss_pct = Math.floor((Math.random() * 100 + 1));
    # //     var enemy = this.map.find_by_position('enemy', x, y);
    # // 
    # //     if ( miss_pct < this.accuracy && enemy ){
    # //       for(var i=0; i < this.strength + this.weapon.attack; i++)
    # //         dmg += this.roll_dice();
    # //       enemy.subtract_hp(dmg);      
    # //     } else {
    # //       dmg = 'miss';
    # //     }
    # // 
    # //     dmg = String(dmg);
    # //     
    # //     if( dmg.length == 1 || dmg == 'miss' )
    # //       hits = $('<h6>' + dmg + '</h6>');
    # //     else if( dmg.length == 2 )
    # //       hits = $('<h5>' + dmg + '</h5>');  
    # //     else if ( dmg.length >= 3 )
    # //       if ( Number(dmg) >= 750 )
    # //         hits = $('<h1>' + dmg + '</h1>');
    # //       else if ( Number(dmg) >= 500 )
    # //         hits = $('<h2>' + dmg + '</h2>');
    # //       else if ( Number(dmg) >= 250 )
    # //         hits = $('<h3>' + dmg + '</h3>');
    # //       else
    # //         hits = $('<h4>' + dmg + '</h4>');
    # //     
    # //     level.map.stat_cell(x, y).html(hits).show();
    # //     hits.shake(3, 3, 180).fadeOut(200 * level.animation_speed);
    # //   },

    # //   move: function(x, y){
    # //     
    # //     this.remove_from_map();
    # //     
    # //     if( this.x == x && this.y == y)
    # //       this.show();
    # //     else
    # //       this.animate_movement(x, y);
    # //   },
    # //   roll_dice: function(){
    # //     return Math.floor((Math.random() * 3 + 1));
    # //   },