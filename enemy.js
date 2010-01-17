function Enemy(opts){
  this.speed = opts.speed || 2;
  this.sprite = opts.sprite || 'pics/enemy.gif';
  this.x = 0;
  this.y = 0;
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
    this.show();
  },
  show: function(){
    var self = this;
    
    self.map.enemy_cell(self.x, self.y)
      .css('background', 'url(' + self.sprite + ') no-repeat center')
      .addClass('pointer')
      .click(function(){
        self.calculate_movement();
      });
  }
})