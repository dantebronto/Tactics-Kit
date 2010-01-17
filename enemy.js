function Enemy(opts){
  this.speed = opts.speed || 2;
  this.sprite = opts.sprite || 'pics/enemy.gif';
  this.x = 0;
  this.y = 0;
  this.has_gone = false;
  this.map = opts.map;
  this.show();
}

Enemy.prototype = Character.prototype;

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
      .removeClass('pointer');
    
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
      .addClass('pointer')
      .click(function(){
        self.calculate_movement();
      });
  },
  target_player: function(){
    var self = this;
    var x = level.active_character.x;
    var y = level.active_character.y;
    res = astar.search(self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
    var target = res[this.speed-1] || res[res.length-1];
    this.move(target.x, target.y);

    // $.each(res, function(){
    //   $('#map_cell_' + this.x + '_' + this.y).addClass('moveable');
    // })
  }
})