class window.Character
  
  @mixin: (mixins...) ->
    for mixin in mixins
      for key, value of mixin::
        @::[key] = value
  
  Character.mixin Experience
  Character.mixin LifeForce
  Character.mixin Actionable
  Character.mixin Moveable
  Character.mixin Attacking
  
  constructor: (@opts={}) ->
    @name = @opts.name or 'Catan'
    @inventory = @opts.inventory or new Inventory()
    @level = @opts.level or 1
    
    @initAp()
    @initHp()
    @initMovement()
    @initAttacking()
    @initExperience()
    
    @sprite = @opts.sprite or '/images/bar.gif'
    
    @accuracy = @opts.accuracy or 80+Math.floor(@level*0.19)
    @strength = @opts.strength or @level
    
    @weapon = @opts.weapon or new Weapon()
    
    @eventDispatch = $('')
    
    @onCreate = @opts.onCreate or ->
    @onTurnStart = @opts.onTurnStart or ->
    @onTurnEnd = @opts.onTurnEnd or ->
    @onDeath = @opts.onDeath or ->
    
    $ => @bindEvents()
    
  addedToLevel: ->
    @drawInfo()
    @bindInfoClicked()
    @bindElemClicked()
    @trigger 'create'
  
  characterSelected: ->
    console.log "#{@name} selected"
    level.clear()
    level.activePlayer = @
    @showMovableCells()
  
  bindInfoClicked: -> @info.bind 'click', => @characterSelected()
  bindElemClicked: -> @getElem().bind 'click', => @characterSelected()
  
  getElem: -> level.getElem @
  
  drawInfo: -> # fill in the info div
    @info = $(TMPL.characterInfo(@))
    @info.hide()
    level.map.info.find('ul').append @info
    @info.fadeIn('slow')
  
  updateInfo: -> 
    @info.html($(TMPL.characterInfo(@)).html())
  
  on: (event, cb) -> @eventDispatch.bind(event, cb)
  trigger: (event, msg) -> @eventDispatch.trigger(event, msg)
  
  bindEvents: ->
    @on 'create', @onCreate
    @on 'turnStart', @onTurnStart
    @on 'turnEnd', @onTurnEnd
    @on 'die', @onDeath

# // var player_id = 1;
# // 
# // var Character = Class.extend({
# //   animate_movement: function(x, y){
# //     var self = this;
# //     
# //     this.map.remove_clickables();
# //     
# //     res = astar.search(self, self.map.terrain_matrix, 
# //       { x: self.x, y: self.y }, { x: x, y: y });
# //     
# //     self.x = res[0].x;
# //     self.y = res[0].y;
# //     
# //     self.show();
# //     
# //     setTimeout(function(){
# //       if( self.is_player ){ self.subtract_ap(1); }
# //       self.move(x, y); }, 250 * level.animation_speed);
# //   },
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
# //   bind_events: function(elem){
# //     var self = this;
# //     if( !elem )
# //       elem = self.map.player_cell(self.x, self.y)
# //     
# //     elem
# //       .haloContext(self, self.get_context_menu)
# //       // .mouseover(function(){ level.show_stats('players', self.level_id)})
# //       // .mouseout(function(){  level.show_stats('players'); })
# //       .click(function(){
# //         elem.unbind('mouseover');
# // //        level.show_stats('players');
# //         self.map.remove_clickables();
# //       });
# //   },
# //   calculate_attack: function(battle){
# //     var self = this;
# //     var attack_matrix = self.get_attack_matrix();
# //     
# //     attack_matrix.each(function(x, y){
# //       if( this.e(x, y) == 1 ){
# //         self.map.underlay_cell(x, y)
# //           .addClass('attackable pointer')
# //           .click(function(){
# //             if ( self.is_player )
# //               if ( battle ){
# //                 level.animation_queue.push(function(){ self.attack(x, y); });
# //                 level.animation_queue.push('noop');
# //                 level.animation_queue.push('noop');
# //                 level.animation_queue.push(function(){ self.attack(x, y); });
# //               } else {
# //                 self.attack(x, y);
# //               }
# //           });
# //       }
# //     });
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
# //   get_context_menu: function(){
# //     var self = this;
# //     var menu = {};
# //     var no_ap_func = function(){ alert('Not enough AP!'); };
# //     
# //    if( this.ap_left < this.speed ){
# //      menu['attack_no_ap'] = no_ap_func;
# //      menu['battle_no_ap'] = no_ap_func;
# //      menu['move']         = function(){ self.calculate_movement(); }
# //      menu['run']          = function(){ self.calculate_movement(true); }
# //      menu['guard_no_ap']  = no_ap_func;
# //      menu['item_no_ap']   = no_ap_func;
# //    } else {
# //      menu['attack'] = function(){ self.calculate_attack(); };
# //      menu['battle'] = function(){ self.calculate_attack(true); }
# //      menu['move']   = function(){ self.calculate_movement(); }
# //      menu['run']    = function(){ self.calculate_movement(true); }
# //      menu['guard']  = function(){ self.end_turn(); }
# //      menu['item']   = function(){ self.show_inventory(); }
# //    }
# //    
# //    menu['end turn'] = function() { 
# //      if ( self.ap_left > 1 ){
# //        var sure = confirm('End your turn with ' + self.ap_left + ' AP remaining?'); 
# //        if(sure) { self.end_turn(); }
# //      } else {
# //        self.end_turn();
# //      }
# //    }
# //    
# //    return menu;
# //   },
# //   get_attack_matrix: function(opts){
# //     if( !opts)
# //       opts = {};
# //     var self = this;
# //     var x = opts.x || self.x;
# //     var y = opts.y || self.y;
# //     
# //     matrix = Matrix.new_filled_matrix(self.map.rows, self.map.cols);
# //     matrix = self.find_neighbors({
# //       x: x, y: y,
# //       matrix: matrix,
# //       speed: self.weapon.range,
# //       is_attacking: true
# //     });
# //     
# //     if( self.weapon.is_ranged )
# //       matrix = self.find_neighbors({
# //         x: x, y: y,
# //         matrix: matrix,
# //         speed: self.weapon.dead_range,
# //         fill_with: 0,
# //         is_attacking: true
# //       });
# //     
# //     matrix.set(x, y, 0);
# //     
# //     return matrix;
# //   },
# //   move: function(x, y){
# //     
# //     this.remove_from_map();
# //     
# //     if( this.x == x && this.y == y)
# //       this.show();
# //     else
# //       this.animate_movement(x, y);
# //   },
# //   remove_from_map: function(){
# //     this.map.player_cell(this.x, this.y)
# //       .css('background', 'transparent')
# //       .removeClass('pointer occupied')
# //       .unbind();
# //   },
# //   roll_dice: function(){
# //     return Math.floor((Math.random() * 3 + 1));
# //   },
# //   show: function(){
# //     var self = this;
# //     var elem = self.map.player_cell(self.x, self.y);
# //     
# //     elem.addClass('pointer occupied')
# //       .css('background', 'url(' + self.sprite + ') no-repeat center');
# //     
# //     self.bind_events(elem);
# //   },
# //   show_inventory: function(){ 
# //     var self = this;
# //     var faceout = $('<h1></h1>');
# //     var link_template = $('<a href="javascript:void(0)"></a>');
# //     var link;
# //     var there_are_items = false;
# //     
# //     $.each(self.inventory.items, function(name){
# //       var item = self.inventory.items[name];
# //       if( item.qty <= 0 )
# //         return;
# //       
# //       there_are_items = true;
# //       use_link = link_template.clone();
# //       throw_link = link_template.clone();
# //   
# //       use_link.html('Use ' + name)
# //         .click(function(){ self.inventory.use(name, self); });
# //     
# //       faceout.append(use_link);
# //   
# //       faceout.append('<span> | </span>');
# //   
# //       throw_link.html('Throw ' + name)
# //         .click(function(){ self.inventory.toss(name, self); });
# //       
# //       faceout.append(throw_link)
# //         .append('<span> x ' + item.qty + '</span>');
# //     });
# //     
# //     if ( !there_are_items )
# //       faceout.html('<h1>No items in inventory!</h1>')
# // 
# //     $.facebox(faceout); 
# //   },
# //   unbind_events: function(){
# //     this.map.player_matrix 
# //       .e(this.x, this.y)
# //       .unbind();
# //   }  
# // });

