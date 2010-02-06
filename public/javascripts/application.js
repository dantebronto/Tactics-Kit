function copy_prototype(descendant, parent) {
  var sConstructor = parent.toString();
  var aMatch = sConstructor.match( /\s*function (.*)\(/ );
  if ( aMatch != null ) { descendant.prototype[aMatch[1]] = parent; }
  for (var m in parent.prototype) {
    descendant.prototype[m] = parent.prototype[m];
  }
};

// Amount of shakes, Shake distance, Time duration
jQuery.fn.shake = function(intShakes, intDistance, intDuration) {
  this.each(function() {
    $(this).css({position:'relative'});
    for (var x=1; x<=intShakes; x++) {
      $(this).animate({left:(intDistance*-1)}, (((intDuration/intShakes)/4)))
      .animate({left:intDistance}, ((intDuration/intShakes)/2))
      .animate({left:0}, (((intDuration/intShakes)/4)));
    }
  });
  return this;
};

function view(val, query){
  if( !query ){ query = ''; }
  val = val.split("/");
  return '/couch/_design/' + val[0] + '/_view/' + val[1] + query
};
  
$(document).ready(function(){
  if ( typeof(init_level) == 'function' )
    init_level();
  
  $('.login_link').click(function(){
    $.facebox(function() { 
      $.get('/login/new/', function(data) {
        $.facebox(data)
      });
    });
    return false;
  });
  
});