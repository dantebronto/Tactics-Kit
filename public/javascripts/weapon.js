function Weapon(opts){
  this.attack = opts.attack || 1;
  this.range = opts.range || 1;
  this.is_ranged = opts.is_ranged || false;
  this.dead_range = opts.dead_range || 1;
  this.name = opts.name || 'Bronze Sword';
}