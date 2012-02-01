class window.Attacking
  
  initAttacking: ->
  
  showAttackableCells: ->
    return if @apLeft <= 0
    speed = @apLeft
    matrix = Level.Matrix.newFilledMatrix level.map.rowCount, level.map.colCount
    matrix = @findNeighbors(@x, @y, matrix, @weapon.range, true)
    matrix.set @x, @y, 0
    matrix.each (x, y) ->
      if Number(this) == 1
        level.clear(x, y)
        level.showCellAs('attackable', x, y)
    
    # if @weapon.isRanged
      # re-run find neighbors with a speed of @weapon.deadZone
      # matrix.each, mark as 0
    matrix
  
  attack: ->
    alert 'cukinf attack!!!'
    # //   attack: function(x, y){
    # //     var self = this;
    # //     
    # //     if( self.ap_left < self.speed )
    # //       return; // not enough ap
    # //     
    # //     self.deal_damage(x, y);  
    # //     self.map.remove_clickables();
    # //     self.subtract_ap(self.speed);
    # //   },
    # //   deal_damage: function(x, y){
    # //     var hits;
    # //     var dmg = 0;
    # //     var miss_pct = Math.floor((Math.random() * 100 + 1));
    # //     var enemy = this.map.find_by_position('enemy', x, y);
    # // 
    # //     if ( miss_pct < this.accuracy && enemy ){
    # //       for(var i=0; i < this.strength + this.weapon.attack; i++)
    # //         dmg += this.roll_dice();
    # //       enemy.subtract_hp(dmg);      
    # //     } else {
    # //       dmg = 'miss';
    # //     }
    # // 
    # //     dmg = String(dmg);
    # //     
    # //     if( dmg.length == 1 || dmg == 'miss' )
    # //       hits = $('<h6>' + dmg + '</h6>');
    # //     else if( dmg.length == 2 )
    # //       hits = $('<h5>' + dmg + '</h5>');  
    # //     else if ( dmg.length >= 3 )
    # //       if ( Number(dmg) >= 750 )
    # //         hits = $('<h1>' + dmg + '</h1>');
    # //       else if ( Number(dmg) >= 500 )
    # //         hits = $('<h2>' + dmg + '</h2>');
    # //       else if ( Number(dmg) >= 250 )
    # //         hits = $('<h3>' + dmg + '</h3>');
    # //       else
    # //         hits = $('<h4>' + dmg + '</h4>');
    # //     
    # //     level.map.stat_cell(x, y).html(hits).show();
    # //     hits.shake(3, 3, 180).fadeOut(200 * level.animation_speed);
    # //   },
    # //   roll_dice: function(){
    # //     return Math.floor((Math.random() * 3 + 1));
    # //   },