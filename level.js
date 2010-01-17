function Level(){
  this.map = new Map([ 
    [ 10, 10, 10, 10, 10, 10, 10 ], 
    [ 10, 15, 15, 10, 10, 10, 10 ], 
    [ 10, 10, 10, 10, 10, 10, 10 ], 
    [ 10, 10, 15, 10, 10, 10, 10 ], 
    [ 10, 10, 15, 10, 15, 15, 10 ],
    [ 10, 10, 10, 10, 10, 15, 10 ],
    [ 10, 10, 10, 10, 10, 10, 10 ],
    [ 10, 10, 10, 10, 10, 10, 10 ] 
  ]);
  var hero = new Character( { map: this.map } );
  this.active_character = hero;
  
  var enemy = new Enemy( { map: this.map } );
  this.active_enemy = enemy;
}