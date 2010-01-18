function Character(opts){
  this.speed = opts.speed || 2;
  this.ap = opts.ap || 4;
  this.ap_left = this.ap;
  this.hp = opts.hp || 100;
  this.hp_left = this.hp;
  this.sprite = opts.sprite || 'pics/bar.gif';
  this.weapon = new Weapon({ range: 1, attack: 1, is_ranged: false, dead_range: 2, name: 'Bronze Sword' });
  this.x = 6;
  this.y = 6;
  this.is_player = true;
  this.is_enemy = false;
  this.map = opts.map;
  this.show();
};

Character.prototype = {
  animate_movement: function(x, y){
    var self = this;
    res = astar.search(self, self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
    
    if( self.is_player )
      self.ap_left -= 1;
    
    self.x = res[0].x;
    self.y = res[0].y;
    
    self.show();
    setTimeout(function(){ self.move(x, y); }, 500);
  },
  attack: function(x, y){
    var self = this;
    
    if( self.ap_left < self.speed )
      return;
    
    self.map.remove_clickables();
    self.ap_left -= self.speed;
    level.show_current_turn();
  },
  bind_events: function(elem){
    var self = this;
    if( !elem )
      elem = self.map.player_cell(self.x, self.y)
    
    elem
      .haloContext(self, self.get_context_menu)
      .click(function(){        
        self.show_stats();
        self.map.remove_clickables();
      });
  },
  calculate_attack: function(){
    var self = this;
    var attack_matrix = self.get_attack_matrix();
    
    attack_matrix.each(function(x, y){
      if( this.e(x, y) == 1 ){
        self.map.underlay_cell(x, y)
          .addClass('attackable pointer')
          .click(function(){
            if ( self.is_player )
              self.attack(x, y);
          });
      }
    });
  },
  calculate_movement: function(){
    var self = this;
    var x = self.x;
    var y = self.y;
    var speed;
    
    if( self.is_player && self.ap_left <= 0 )
      return;
    
    if( self.is_player && self.ap_left < self.speed )
      speed = self.ap_left;
    else
      speed = self.speed;
    
    matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
    matrix = self.find_neighbors({
      x: x, y: y,
      matrix: matrix,
      speed: speed
    });
    
    matrix.set(x, y, 0);
    
    matrix.each(function(x, y){ 
      if( this.e(x, y) == 1 ){        
        self.map.underlay_cell(x, y)
          .addClass('moveable pointer')
          .click(function(){
            if ( self.is_player )
              self.move(x, y);
          });
      }
    });
  },
  can_move_to: function(x, y){
    var terrain = this.map.terrain_matrix.e(x, y);
    var enemy   = this.map.enemy_matrix.e(x, y);
    var player  = this.map.player_matrix.e(x, y);
    
    if( !terrain || terrain > 10 || 
      enemy.hasClass('occupied') || 
      player.hasClass('occupied') )
      return false;
    
    return true;
  },
  end_turn: function(){
    this.ap_left = 0;
    level.show_current_turn();
  },
  find_neighbors: function(opts){
    var x = opts.x, y = opts.y, speed = opts.speed - 1;
    var is_attacking = opts.is_attacking || false;
    var fill_with = 1;
    if( opts.fill_with == 0 )
      fill_with = 0;
    
    var surrounds = [ 
      [ x, y-1 ], [ x+1, y-1 ], [ x+1, y ], [ x+1, y+1 ],
      [ x, y+1 ], [ x-1, y+1 ], [ x-1, y ], [ x-1, y-1 ] 
    ];
    
    for(var i=0; i<8; i++){
      x = surrounds[i][0];
      y = surrounds[i][1];
      
      if( is_attacking || this.can_move_to(x, y) ){
        opts.matrix.set(x, y, fill_with);
        if( speed > 0 ){
          this.find_neighbors({
            x: x, y: y,
            matrix: opts.matrix,
            speed: speed,
            fill_with: fill_with,
            is_attacking: is_attacking
          });
        } 
      }        
    }
    return matrix;
  },
  get_context_menu: function(){
    var self = this;
    var menu = {};
    var no_ap_func = function(){ alert('Not enough AP!'); };
    
		if( this.ap_left < this.speed ){
		  menu['attack_no_ap'] = no_ap_func;
		  menu['guard_no_ap']  = no_ap_func;
		} else {
		  menu['attack'] = function(){ self.calculate_attack(); };
		  menu['guard']  = function(){ self.end_turn(); }
		}
		
		menu['move']     = function() { self.calculate_movement(); }
	  menu['end turn'] = function() { 
	    var sure = confirm('End your turn with ' + self.ap_left + ' AP remaining?'); 
	    if(sure) { self.end_turn(); }
	  }
		
		return menu;
  },
  get_attack_matrix: function(opts){
    var self = this;
    var x = self.x;
    var y = self.y;
    
    matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
    matrix = self.find_neighbors({
      x: x, y: y,
      matrix: matrix,
      speed: self.weapon.range,
      is_attacking: true
    });
    
    if( self.weapon.is_ranged )
      matrix = self.find_neighbors({
        x: x, y: y,
        matrix: matrix,
        speed: self.weapon.dead_range,
        fill_with: 0,
        is_attacking: true
      });
    
    matrix.set(x, y, 0);
    
    return matrix;
  },
  has_gone: function(){
    if( this.ap_left == 0 ){
      this.map.player_matrix
        .e(this.x, this.y)
        .unbind();
      return true; 
    }
    return false;
  },
  move: function(x, y){
    
    this.map.player_cell(this.x, this.y)
      .css('background', 'transparent')
      .unbind('click')
      .removeClass('pointer occupied');
    
    if( this.x == x && this.y == y){
      this.map.remove_clickables();
      level.show_current_turn();
      this.show();
    } else {
      this.animate_movement(x, y);
    }
  },
  show: function(){
    var self = this;
    var elem = self.map.player_cell(self.x, self.y);
    
    elem.addClass('pointer occupied')
      .css('background', 'url(' + self.sprite + ') no-repeat center');
    
    self.bind_events(elem);
  },
  show_stats: function(){
    var stats = $('#info #stats_list');
    if( !stats.length ){
      stats = $('<ul></ul>').attr('id', 'stats_list');
      stats.appendTo(level.info_div);
    }
    var lis = $(
      '<li>HP: ' + this.hp_left + '/' + this.hp + '</li>' +
      '<li>AP: ' + this.ap_left + '/' + this.ap + '</li>' +
      '<li>SP: ' + this.speed   + '</li>'
    );
    stats.html(lis);
  }
};