function Character(opts){
  this.level_id = 0;
  this.name = opts.name || 'd00d';
  this.level = opts.level || 1;
  this.inventory = opts.inventory;
  this.ap = opts.ap || Math.floor(4 + this.level * 0.07);
  this.speed = opts.speed || Math.floor(this.ap / 2);
  this.ap_left = this.ap;
  this.hp = opts.hp || Math.floor(50.1 + this.level * 29.65);
  this.hp_left = this.hp;
  this.exp = opts.exp || 0;
  this.exp_next = opts.exp_next || this.level * 100;
  this.sprite = opts.sprite || '/images/bar.gif';
  this.weapon = new Weapon({ range: 3, attack: 2, is_ranged: false, dead_range: 0, name: 'Bronze Sword' });
  this.accuracy = opts.accuracy || 80 + Math.floor(this.level * 0.19);
  this.strength = opts.strength || this.level;
  this.strength = this.strength + this.weapon.attack;
  this.x = opts.x || 3;
  this.y = opts.y || 3;
  this.is_player = true;
  this.is_enemy = false;
  this.map = opts.map;
  this.show();
};

Character.prototype = {
  add_exp: function(amt){
    for( var i=0; i < amt; i++ ){
      this.exp += 1;
      this.exp_next -= 1;
      
      if( this.exp_next <= 0 )
        this.level_up();
    }
  },
  animate_movement: function(x, y){
    var self = this;
    
    this.map.remove_clickables();
    
    res = astar.search(self, self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
    
    self.x = res[0].x;
    self.y = res[0].y;
    
    self.show();
    
    setTimeout(function(){
      if( self.is_player ){ self.subtract_ap(1); }
      self.move(x, y); }, 250 * level.animation_speed);
  },
  attack: function(x, y){
    var self = this;
    
    if( self.ap_left < self.speed )
      return; // not enough ap
    
    self.deal_damage(x, y);  
    self.map.remove_clickables();
    self.subtract_ap(self.speed);
  },
  bind_events: function(elem){
    var self = this;
    if( !elem )
      elem = self.map.player_cell(self.x, self.y)
    
    elem
      .haloContext(self, self.get_context_menu)
      .mouseover(function(){ level.show_stats('players', self.level_id)})
      .mouseout(function(){  level.show_stats('players'); })
      .click(function(){
        elem.unbind('mouseover');
        level.show_stats('players');
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
  deal_damage: function(x, y){
    var hits;
    var dmg = 0;
    var miss_pct = Math.floor((Math.random() * 100 + 1));
    var enemy = this.map.find_by_position('enemy', x, y);

    if ( miss_pct < this.accuracy && enemy ){
      for(var i=0; i < this.strength; i++)
        dmg += this.roll_dice();
      enemy.subtract_hp(dmg);      
    } else {
      dmg = 'miss';
    }

    dmg = String(dmg);
    
    if( dmg.length == 1 || dmg == 'miss' )
      hits = $('<h6>' + dmg + '</h6>');
    else if( dmg.length == 2 )
      hits = $('<h5>' + dmg + '</h5>');  
    else if ( dmg.length >= 3 )
      if ( Number(dmg) >= 750 )
        hits = $('<h1>' + dmg + '</h1>');
      else if ( Number(dmg) >= 500 )
        hits = $('<h2>' + dmg + '</h2>');
      else if ( Number(dmg) >= 250 )
        hits = $('<h3>' + dmg + '</h3>');
      else
        hits = $('<h4>' + dmg + '</h4>');
    
    this.map.stat_cell(x, y).html(hits);
    hits.shake(3, 3, 180);
    hits.fadeOut(2000);
  },
  die: function(){
    this.remove_from_map();
    level.remove_player(this);
  },
  end_turn: function(){
    this.subtract_ap(this.ap_left);
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
        if( opts.matrix.e(x, y) != fill_with)
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
		  menu['item_no_ap'] = no_ap_func;
		} else {
		  menu['attack'] = function(){ self.calculate_attack(); };
		  menu['guard']  = function(){ self.end_turn(); }
		  menu['item'] = function(){ self.show_inventory(); }
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
    if( this.ap_left == 0 )
      return true; 

    return false;
  },
  level_up: function(){
    this.level += 1;
    this.exp_next = this.level * 100;
    this.speed = Math.floor(this.ap / 2);
    this.ap = Math.floor(4 + this.level * 0.07);
    this.hp = Math.floor(71.1 + this.level * 29.65);
    this.accuracy = 80 + Math.floor(this.level * 0.19);
    this.strength = this.level;
    alert('Level up! ' + this.name + ' is now level ' + this.level + '!');
  },
  move: function(x, y){
    
    this.remove_from_map();
    
    if( this.x == x && this.y == y)
      this.show();
    else
      this.animate_movement(x, y);
  },
  remove_from_map: function(){
    this.map.player_cell(this.x, this.y)
      .css('background', 'transparent')
      .removeClass('pointer occupied')
      .unbind();
  },
  roll_dice: function(){
    return Math.floor((Math.random() * 3 + 1));
  },
  show: function(){
    var self = this;
    var elem = self.map.player_cell(self.x, self.y);
    
    elem.addClass('pointer occupied')
      .css('background', 'url(' + self.sprite + ') no-repeat center');
    
    self.bind_events(elem);
  },
  show_inventory: function(){ 
    var self = this;
    var faceout = $('<h1></h1>');
    var link_template = $('<a href="javascript:void(0)"></a>');
    var link;
    var there_are_items = false;
    
    for( item in self.inventory.items){
      if( self.inventory.get(item).qty <= 0 )
        continue;
      
      there_are_items = true;
      use_link = link_template.clone();
      throw_link = link_template.clone();
      
      use_link.html('Use ' + item)
        .click(function(){ self.inventory.use(item, self); });
        
      faceout.append(use_link);
      
      faceout.append('<span> | </span>');
      
      throw_link.html('Throw ' + item)
        .click(function(){ self.inventory.toss(item, self); });
          
      faceout.append(throw_link)
        .append('<span> x ' + self.inventory.get(item).qty + '</span>');
    }
    if ( !there_are_items )
      faceout.html('<h1>No items in inventory!</h1>')
    
    $.facebox(faceout); 
  },
  subtract_ap: function(amt){
    if( !amt ) { amt = 0; }
    this.ap_left -= amt;
    if( this.ap_left <= 0 ){
      this.ap_left = 0;
      this.unbind_events();
    }
    if ( this.is_player )
      level.show_stats('players');
    
    level.show_current_turn();
  },
  subtract_hp: function(amt){
    this.hp_left -= amt;
    
    if ( this.is_player )
      level.show_stats('players');
    
    if( this.hp_left <= 0 )
      this.die();
  },
  unbind_events: function(){
    this.map.player_matrix 
      .e(this.x, this.y)
      .unbind();
  }
};