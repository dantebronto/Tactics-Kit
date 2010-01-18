function Enemy(opts){
  this.speed = opts.speed || 2;
  this.ap = 0;
  this.ap_left = 0;
  this.hp = opts.hp || 100;
  this.hp_left = this.hp;
  this.has_moved = false;
  this.has_attacked = false;
  this.weapon = new Weapon({ attack_range: 1, attack: 1, name: 'Bronze Sword' });
  this.sprite = opts.sprite || 'pics/enemy.gif';
  this.accuracy = opts.accuracy || 80;
  this.strength = opts.strength || 2;
  this.x = 0;
  this.y = 0;
  this.map = opts.map;
  this.is_player = false;
  this.is_enemy = true;
  this.show();
};

copy_prototype(Enemy, Character);

$.extend(Enemy.prototype, {
  animate_attack: function(x, y){
    var self = this;
    self.calculate_attack();
    self.has_attacked = true;
    setTimeout(function(){ self.attack_specific_square(x, y); }, 1000);
  },
  attack: function(x, y){
    this.has_moved = true;
    this.map.remove_clickables();
    level.show_current_turn();
  },
  attack_if_possible: function(){
    var self = this;
    var attack_matrix = this.get_attack_matrix();
    
    attack_matrix.each(function(x, y){
      if( attack_matrix.e(x, y) == 1 && 
        self.map.player_cell(x, y).hasClass('occupied') ){
        self.animate_attack(x, y);
      }  
    });
  },
  attack_specific_square: function(x, y){
    var self = this;
    self.map.remove_clickables();
    self.map.underlay_cell(x, y).addClass('attackable');
    setTimeout(function(){ self.attack(x, y); }, 1000);
  },
  calculate_turn: function(){
    this.attack_if_possible();
    
    if( !this.has_attacked )
      this.move_to_player();
  },
  has_gone: function(){
    return this.has_moved && this.has_attacked;
  },
  move: function(x, y){
    
    this.map.enemy_cell(this.x, this.y)
      .css('background', 'transparent')
      .unbind('click')
      .removeClass('pointer occupied');
    
    this.attack_if_possible();
    
    if( this.x == x && this.y == y){ // at destination
      this.has_moved = true;
      this.has_attacked = true; // should've done it by now
      this.show();
      this.map.remove_clickables( ['pointer', 'moveable'] );
      level.show_current_turn();
    } else {
      this.animate_movement(x, y);
    }
  },
  move_to_player: function(){
    var self = this;
    var x = level.active_player.x;
    var y = level.active_player.y;
    var target;
    
    res = astar.search(self, self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
    
    // all moves within speed range  
    res = res.splice(0, this.speed);
    
    // move as close as possible to player
    for( var i = res.length - 1; i >= 0; i--){
      target = res[i];
      
      if( self.can_move_to(target.x, target.y) ){
        self.show_movement(target.x, target.y);
        return;
      }
    }
    self.show_movement(self.x, self.y); // move to own space
  },
  show: function(){
    this.map.enemy_cell(this.x, this.y)
      .css('background', 'url(' + this.sprite + ') no-repeat center')
      .addClass('pointer occupied');
  },
  show_movement: function(x, y){
    var self = this;
    self.calculate_movement();
    setTimeout(function(){ self.move(x, y); }, 1000);
  }
});