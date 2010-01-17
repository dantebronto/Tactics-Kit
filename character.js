function Character(opts){
  this.speed = opts.speed || 2;
  this.sprite = opts.sprite || 'pics/bar.gif';
  this.x = 6;
  this.y = 7;
  this.has_gone = false;
  this.map = opts.map;
  this.show();
};

Character.prototype = {
  move: function(x, y){
    this.map.div
      .find('.underlay.moveable')
      .removeClass('moveable')
      .removeClass('pointer')
      .unbind('click');
    
    this.map.player_cell(this.x, this.y)
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
    
    self.map.player_cell(self.x, self.y)
      .css('background', 'url(' + self.sprite + ') no-repeat center')
      .addClass('pointer occupied')
      .click(function(){
        self.calculate_movement();
      });
  },
  calculate_movement: function(){
    var self = this;
    var x = self.x;
    var y = self.y;
    
    matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
    matrix = self.find_neighbors({
      x: x, y: y,
      matrix: matrix,
      speed: self.speed
    });
    
    matrix.set(x, y, 0);
    
    matrix.each(function(x, y){ 
      if( this.e(x, y) == 1 ){
        
        self.map.underlay_cell(x, y)
          .addClass('moveable')
          .click(function(){
            self.move(x, y);
          })
          .addClass('pointer');
      }
    });
  },
  find_neighbors: function(opts){
    var x = opts.x, y = opts.y, speed = opts.speed - 1;
    var surrounds = [ 
      [ x, y-1 ], [ x+1, y-1 ], [ x+1, y ], [ x+1, y+1 ],
      [ x, y+1 ], [ x-1, y+1 ], [ x-1, y ], [ x-1, y-1 ] 
    ];
    
    for(var i=0; i<8; i++){
      x = surrounds[i][0];
      y = surrounds[i][1];
      
      if( this.can_move_to(x, y) ){
        opts.matrix.set(x, y, 1);
        if( speed > 0 ){
          this.find_neighbors({
            x: x, y: y,
            matrix: opts.matrix,
            speed: speed
          });
        } 
      }        
    }
    return matrix;
  },
  can_move_to: function(x, y){
    var terrain = this.map.terrain_matrix.e(x, y);
    var enemy   = this.map.enemy_matrix.e(x, y);
    var player  = this.map.player_matrix.e(x, y);
    
    if( !terrain ) // not on the map
      return false;
    
    if( terrain > 10 || enemy.hasClass('occupied') || player.hasClass('occupied') )
      return false;
      
    return true;
  }
};