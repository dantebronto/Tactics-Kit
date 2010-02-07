/*
var inv = new Inventory([
  ['Potion', 3],
  ['Surge', 5],
  ['etc', 1]
]);
*/

var Inventory = Class.extend({
  init: function(array){
    this.items = this.all_possible_items();

    for(var i=0; i < array.length; i++)
      this.add(array[i][0], array[i][1]);
  },
  add: function(name, qty){
     this.items[name].qty += qty;
   },
   use: function(item, used_by){
     used_by.subtract_ap(2);
     this.get(item).qty -= 1;
     this.get(item).use(used_by);
     $(document).trigger('close.facebox');
   },
   toss: function(item, used_by){
     var self = this;
     var speed = 3;

     matrix = Matrix.new_filled_matrix(used_by.map.rows, used_by.map.cols);
     matrix = used_by.find_neighbors({
       x: used_by.x, y: used_by.y,
       matrix: matrix,
       speed: speed,
       is_attacking: true // apply to all in range
     });

     matrix.set(used_by.x, used_by.y, 0);

     matrix.each(function(x, y){ 
       if( this.e(x, y) == 1 ){        
         used_by.map.underlay_cell(x, y)
           .addClass('healable pointer')

         used_by.map.overlay_cell(x, y)
           .click(function(){
             self.get(item).qty -= 1;
             used_by.subtract_ap(2);
             self.items[item].toss(x, y, used_by); 
             used_by.map.remove_clickables();
             $('#map .cell.overlay').unbind();
             return false;
           });
       }
       used_by.map.player_cell(used_by.x, used_by.y).one('click', function(e){
         $('#map .cell.overlay').unbind();
       });
     })
     $(document).trigger('close.facebox');
   },
   get: function(item_type){
     return this.items[item_type];
   },
   all_possible_items: function(){
     return {   
       'Potion': { 
         qty: 0, 
         use: function(used_by){
           used_by.hp_left += 25
           if ( used_by.hp_left > used_by.hp )
             used_by.hp_left = used_by.hp;
           level.show_stats('players', used_by.level_id);
         },
         toss: function(x, y, used_by){
           var used_on = used_by.map.find_by_position('player', x, y);
           used_on = used_on || used_by.map.find_by_position('enemy', x, y);

           if ( !used_on )
             return;

           used_on.hp_left += 25
           if ( used_on.hp_left > used_on.hp )
             used_on.hp_left = used_on.hp;

           if ( used_on.is_player )
             level.show_stats('players', used_on.level_id);
           else
             level.show_stats('enemies', used_on.level_id);
         } 
       },
       'Hi Potion': { 
         qty: 0, 
         use: function(used_by){
           alert('used hi potion');
         },
         toss: function(x, y, used_by){
           alert('tossed hi potion');
         } 
       } //, end potion
       // add items here
     } // end return from all_possible_items
   } // end all_possible_items
});