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

	$.fn.haloContext = function(bindings) {
		$(this).bind("click", function(e) {
			if (active) hide();
			display(this, bindings['bindings'], e);
			return false;
		}); 
		return this;
	};

	function display(trigger, binds, e) {
		active = true; // context active
		c = 0; // bind count
		for(var name in binds) {
			$('body').append('<div id="hb'+c+'" class="hct">'+name+'</div>');
			$('#hb'+c).click(binds[name]);
			c++;
		}
	
		x = e.pageX-24;
		y = e.pageY-24;
		r = (48*(1/(Math.tan(Math.PI/c)))/2)+18; // fun math!
	
		$('body').append('<div id="hpt"></div>');
		$('#hpt').css("left", e.pageX-5).css("top", e.pageY-5).toggle(); // stupid hack
		
		ang = (360/c);
		for(i=0; i<c; i++) {
			temp = $('#hb'+i);
			temp.css("left", x+Math.cos(((ang*i*Math.PI)/180))*r);
			temp.css("top", y+Math.sin(((ang*i*Math.PI)/180))*r);
			temp.fadeIn("fast");
		}
		$(document).one("click", hide);
		$('#hpt').one("contextmenu", hide);
	}

	function hide() {
		$('div').remove('#hpt');
		$('div').remove('.hct'); 	
		active = false;
		return false;
	}

})(jQuery);
