function Enemy(opts){
  this.speed = opts.speed || 3;
  this.sprite = opts.sprite || 'pics/enemy.gif';
  this.x = 0;
  this.y = 0;
  this.has_gone = false;
  this.map = opts.map;
  this.show();
}

copy_prototype(Enemy, Character);

$.extend(Enemy.prototype, {
  move: function(x, y){
    this.map.div
      .find('.underlay.moveable')
      .removeClass('moveable')
      .removeClass('pointer')
      .unbind('click');
    
    this.map.enemy_cell(this.x, this.y)
      .css('background', 'transparent')
      .unbind('click')
      .removeClass('pointer occupied');
    
    this.x = x;
    this.y = y;
    this.has_gone = true;
    this.show();
    level.show_current_turn();
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
    
    res = astar.search(self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
      
    // all moves within speed range  
    res = res.splice(0, this.speed);
    
    // move as close as possible to player
    for( var i = res.length - 1; i >= 0; i--){
      target = res[i];
      
      if(self.can_move_to(target.x, target.y)){
        self.move(target.x, target.y);
        return;
      }
    }
  }
})