import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import $ from 'jquery';

import './landing.html';
import './landing.css';
import './header.css';
import './text.css';
import './contact.css';
import './footer.css';

function size(value){
    return( parseInt( value.replace('px','') ,10) ); 
}

var nav_alpha_start = 0.0
var current_alpha = 0.0
var max_alpha = 0.8

Template.landing.onRendered(function(){
	var headerHeight = $('.landing-header').height();
	var navHeight = $('.navbar-top').height()
	var total_height = headerHeight + navHeight

	//$( "#tagline" ).toggle( "bounce", { times: 3 }, 'slow' );

	$(window).scroll(function() {  
		var pos = $(document).scrollTop();

		var parallax = parseInt(pos * -0.45) + 'px';
		$('.landing-header-content').css('margin-top', parallax);

		// To start fading right as nav bar moves over landing area, set the threshold equal to 1.0 minus the ratio of the nav bar
		// height to the overall header height.
		var threshold = (total_height  - 2.0 * navHeight)
		var threshold_pct = threshold / total_height 
		var pos_percent = pos / total_height

		if(pos_percent > threshold_pct){ // Same as x1 > 0
			var x1 = pos - threshold // Distance from Threshold

			// Percent Along for Which Shading Occurs
			var ratio = x1 / navHeight // Will Continue Shading NavBar Height Passed Edge
			if(ratio < 1.0){
				var rgba = nav_alpha_start + ratio * max_alpha;
				$('.navbar-top').css('background', 'rgba(43,44,50,' + rgba);
			}
		}
		
	});
})
