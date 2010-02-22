/*
 * HaloContext - jQuery plugin for right-click halo context menus
 *
 * Author: Josh Hundley
 * Parts inspired by Chris Domigan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {
	var active = false;

	$.fn.haloContext = function(player, bindings) {
		$(this).click(function(e) {
			if (active) hide();
			if ( player.ap_left > 0 )
  			display(this, bindings.call(player), e, player);
			return false;
		}); 
		return this;
	};
	
	function display(trigger, binds, e, player) {
		active = true; // context active
		c = 0; // bind count
		var no_ap;
		var display_name;
		
		for(var name in binds) {
		  no_ap = name.match(/_no_ap/) ? true : false;
		  
		  if( no_ap )
  		  $('body').append('<div id="hb'+c+'" class="hct no_ap">'+name.replace('_no_ap', '')+'</div>');
		  else
			  $('body').append('<div id="hb'+c+'" class="hct">'+name+'</div>');
			$('#hb'+c).click(binds[name]);
			c++;
		}
		
		x = e.pageX-24;
		y = e.pageY-24;
		r = (48*(1/(Math.tan(Math.PI/c)))/2)+18; // fun math!
	
		$('body').append('<div id="hpt"></div>');
		$('#hpt').css("left", e.pageX-5).css("top", e.pageY-5).toggle(); // stupid hack
		
		var last_y = e.pageY;
		ang = (360/c);
		for(i=0; i<c; i++) {
			temp = $('#hb'+i);
      temp.css("left", e.pageX);
      temp.css("top", last_y);
			temp.fadeIn("fast");
			last_y += 20;
		}
		$(document).one("click", function(){ 
		  hide(); 
		  $(trigger).mouseover(function(){ 
		    level.show_stats('players', player.level_id);
		  });
		});
	}

	function hide() {
		$('div').remove('#hpt');
		$('div').remove('.hct'); 	
		active = false;
		return false;
	}

})(jQuery);
