function Enemy(opts){
  this.level_id = 0;
  this.level = opts.level || 1;
  this.name = opts.name || 'Level ' + this.level + ' Battle Mage';
  this.speed = opts.speed || 2;
  this.ap = 0;
  this.ap_left = 0;
  this.hp = opts.hp || 25;
  this.hp_left = this.hp;
  this.has_moved = false;
  this.has_attacked = false;
  this.weapon = new Weapon({ attack_range: 1, attack: 1, name: 'Bronze Sword' });
  this.sprite = opts.sprite || '/images/enemy.gif';
  this.accuracy = opts.accuracy || 80;
  this.strength = opts.strength || 2;
  this.strength = this.strength + this.weapon.attack;
  this.exp = opts.exp || this.level * 12;
  this.x = opts.x || 3;
  this.y = opts.y || 14;
  this.map = opts.map;
  this.is_player = false;
  this.is_enemy = true;
  this.show();
};

copy_prototype(Enemy, Character);

$.extend(Enemy.prototype, {
  animate_attack: function(x, y){
    var self = this;
    self.has_attacked = true;
    self.calculate_attack();
    setTimeout(function(){ self.attack_specific_square(x, y); }, 500 * level.animation_speed);
  },
  attack: function(x, y){
    this.has_moved = true;
    this.deal_damage(x, y);  
    this.map.remove_clickables();
  },
  attack_if_possible: function(){
    var self = this;
    var attack_matrix = this.get_attack_matrix();
    
    attack_matrix.each(function(x, y){
      if( attack_matrix.e(x, y) == 1 && self.map.player_cell(x, y).hasClass('occupied') ){
        if( !self.has_attacked ) // don't check this for area of effect
          self.animate_attack(x, y);
      }  
    });
  },
  attack_specific_square: function(x, y){
    var self = this;
    self.map.remove_clickables();
    self.map.underlay_cell(x, y).addClass('attackable');
    setTimeout(function(){ self.attack(x, y); level.show_current_turn(); }, 250 * level.animation_speed);
  },
  calculate_turn: function(){
    this.attack_if_possible();
    
    if( !this.has_attacked )
      this.move_to_player();
  },
  deal_damage: function(x, y){
    var hits;
    var dmg = 0;
    var miss_pct = Math.floor((Math.random() * 100 + 1));
    var player = this.map.find_by_position('player', x, y);
    
    if ( miss_pct < this.accuracy && player ){
      for(var i=0; i < this.strength; i++)
        dmg += this.roll_dice();
      player.subtract_hp(dmg);      
    } else {
      dmg = 'miss';
    }
    
    dmg = String(dmg);
    
    if( dmg.length == 1 || dmg == 'miss' )
      hits = $('<h3>' + dmg + '</h3>');
    else if ( dmg.length == 2 )
      hits = $('<h2>' + dmg + '</h2>');
    else if ( dmg.length == 3 )
      hits = $('<h1>' + dmg + '</h1>');

    level.map.stat_cell(x, y).html(hits).show().shake(3, 3, 180).fadeOut(500);
  },
  die: function(){
    this.remove_from_map();
    level.distribute_exp(this.exp);
    level.remove_enemy(this);
  },
  has_gone: function(){
    return this.has_moved && this.has_attacked;
  },
  move: function(x, y){
    
    this.remove_from_map();
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
    var weakest_player = self.target_player();
    var x = weakest_player.x;
    var y = weakest_player.y;
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
  remove_from_map: function(){
    this.map.enemy_cell(this.x, this.y)
      .css('background', 'transparent')
      .removeClass('pointer occupied')
      .unbind();
  },
  show: function(){
    var self = this;
    this.map.enemy_cell(this.x, this.y)
      .addClass('pointer occupied')
      .css('background', 'url(' + this.sprite + ') no-repeat center')
      .mouseover(function(){ level.show_stats('enemies', self.level_id)})
      .mouseout(function(){  level.show_stats('players'); })
      .click( function(){ level.show_stats('enemies'); });
  },
  show_movement: function(x, y){
    var self = this;
    self.calculate_movement();
    setTimeout(function(){ self.move(x, y); }, 750 * level.animation_speed);
  },
  target_player: function(){
    var weakest_player = level.players[0];
    for( var i=level.players.length - 1; i >= 0; i-- )
      if ( level.players[i].hp_left < weakest_player.hp_left )
        weakest_player = level.players[i];
    return weakest_player;
  }
});