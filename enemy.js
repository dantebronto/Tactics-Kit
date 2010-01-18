function Enemy(opts){
  this.speed = opts.speed || 2;
  this.ap = 0;
  this.ap_left = 0;
  this.hp = opts.hp || 100;
  this.hp_left = this.hp;
  this.has_moved = false;
  this.has_attacked = true;
  this.weapon = new Weapon({ attack_range: 1, attack: 1, name: 'Bronze Sword' });
  this.sprite = opts.sprite || 'pics/enemy.gif';
  this.x = 0;
  this.y = 0;
  this.map = opts.map;
  this.is_player = false;
  this.is_enemy = true;
  this.show();
};

copy_prototype(Enemy, Character);

$.extend(Enemy.prototype, {
  move: function(x, y){
    
    this.map.enemy_cell(this.x, this.y)
      .css('background', 'transparent')
      .unbind('click')
      .removeClass('pointer occupied');
    
    if( this.x == x && this.y == y){ // at destination
      this.map.div
        .find('.underlay.moveable')
        .removeClass('moveable pointer')
        .unbind('click');
      
      this.show();
      this.has_moved = true;
      level.show_current_turn();
    } else {
      this.animate_movement(x, y);
    }
  },
  show: function(){
    var self = this;
    
    self.map.enemy_cell(self.x, self.y)
      .css('background', 'url(' + self.sprite + ') no-repeat center')
      .addClass('pointer occupied');
  },
  target_player: function(){
    var self = this;
    var x = level.active_character.x;
    var y = level.active_character.y;
    var target;
    
    res = astar.search(self, self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
    
    // all moves within speed range  
    res = res.splice(0, this.speed);
    
    // move as close as possible to player
    for( var i = res.length - 1; i >= 0; i--){
      target = res[i];
      
      if(self.can_move_to(target.x, target.y)){
        self.show_movement(target.x, target.y);
        return;
      }
    }
    self.show_movement(self.x, self.y); // move to own space
  },
  show_movement: function(x, y){
    var self = this;
    self.calculate_movement();
    setTimeout(function(){ self.move(x, y); }, 1000);
  },
  has_gone: function(){
    return this.has_moved && this.has_attacked;
  }
});