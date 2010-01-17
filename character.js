function Character(opts){
  this.speed = opts.speed || 3;
  this.sprite = opts.sprite || 'pics/bar.gif';
  this.weapon = new Weapon({ attack_range: 1, attack: 1, name: 'Bronze Sword' });
  this.x = 6;
  this.y = 7;
  this.has_gone = false;
  this.map = opts.map;
  this.show();
};

Character.prototype = {
  move: function(x, y){
    
    this.map.player_cell(this.x, this.y)
      .css('background', 'transparent')
      .unbind('click')
      .removeClass('pointer occupied');
    
    if( this.x == x && this.y == y){
      this.map.div
        .find('.underlay.moveable')
        .removeClass('moveable pointer')
        .unbind('click');
      
      this.has_gone = true;
      this.show();
      level.show_current_turn();
    } else {
      this.animate_movement(x, y);
    }
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
    
    var fill_with = 1;
    if(opts.fill_with == 0)
      fill_with = 0;
      
    var surrounds = [ 
      [ x, y-1 ], [ x+1, y-1 ], [ x+1, y ], [ x+1, y+1 ],
      [ x, y+1 ], [ x-1, y+1 ], [ x-1, y ], [ x-1, y-1 ] 
    ];

    for(var i=0; i<8; i++){
      x = surrounds[i][0];
      y = surrounds[i][1];
      
      if( this.can_move_to(x, y) ){
        opts.matrix.set(x, y, fill_with);
        if( speed > 0 ){
          this.find_neighbors({
            x: x, y: y,
            matrix: opts.matrix,
            speed: speed,
            fill_with: fill_with
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
    
    if( !terrain || terrain > 10 || enemy.hasClass('occupied') || player.hasClass('occupied') )
      return false;
    
    return true;
  },
  animate_movement: function(x, y){
    var self = this;
    res = astar.search(self, self.map.terrain_matrix, 
      { x: self.x, y: self.y }, { x: x, y: y });
    
    self.x = res[0].x;
    self.y = res[0].y;
    
    self.show();
    setTimeout(function(){ self.move(x, y); }, 500);
  },
  get_attack_matrix: function(opts){
    var self = this;
    var x = self.x;
    var y = self.y;
    
    matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
    matrix = self.find_neighbors({
      x: x, y: y,
      matrix: matrix,
      speed: self.weapon.range
    });
    
    if( self.weapon.is_ranged )
      matrix = self.find_neighbors({
        x: x, y: y,
        matrix: matrix,
        speed: self.weapon.dead_range,
        fill_with: 0
      });
    
    return matrix;
  }
};