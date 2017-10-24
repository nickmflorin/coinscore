import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import $ from 'jquery';

import './landing.html';
import './landing.css';
import './header.css';
import './text.css';
import './contact.css';
import './footer.css';

import { Email } from 'meteor/email'
import swal from 'sweetalert'

function size(value){
    return( parseInt( value.replace('px','') ,10) ); 
}

var nav_alpha_start = 0.0
var current_alpha = 0.0
var max_alpha = 0.6

Template.landing.onRendered(function(){
	var headerHeight = $('.landing-header').height();
	var navHeight = $('.navbar-top').height()
	var total_height = headerHeight + navHeight

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
				$('.navbar-top').css('background', 'rgba(43,43,49,' + rgba);
			}
		}
		
	});
})

Template.beta.events({
	'click .beta-close-button' : function(e, t){
		if($('.landing-tagline-container').hasClass('landing-tagline-container-left')){
			
			$('.landing-tagline-container').addClass('bounce').queue(function(){
			   $(this).removeClass('bounce'); 
			   $(this).dequeue();
			});

			$('.landing-tagline-container').removeClass('landing-tagline-container-left')
			$('.landing-tagline-container').addClass('landing-tagline-container-center')
		}

		if($('.landing-logo-container').hasClass('landing-logo-container-left')){

			$('.landing-logo-container').addClass('bounce').queue(function(){
			   $(this).removeClass('bounce'); 
			   $(this).dequeue();
			});

			$('.landing-logo-container').removeClass('landing-logo-container-left')
			$('.landing-logo-container').addClass('landing-logo-container-center')
		}
		$('.beta-form-container').animate({'right':"-400px"}, 300)

			// $('.landing-logo-container').queue(function(){
			// 	$('.beta-form-container').animate({'right':"-400px"}, 300)
			// 	$(this).animate({'margin':"0 auto%"}, 300).delay(3).queue(function () {
			// 		//$('.landing-tagline-container').animate({'margin':"0 auto"}, 300)
			// 		$('.landing-tagline-container').addClass('landing-tagline-container-center')
			// 	}).dequeue()
			// })
	}
})

Template.beta.events({
	'click #beta-submit' : function(e,t){
		e.preventDefault()

		var fromEmail = $('#beta-email').val()
		var fromName = $('#beta-name').val()

		Meteor.call('sendSignupEmail', fromEmail, fromName, function(error,response){
			if(error){
				swal(error.reason,"Sorry, we couldn't submit your sign up request.  Please fix and try again.")
				return
			}
		})
	}
})

Template.landingHeader.events({
	'click #try-beta' : function(e,t){
		e.preventDefault()

		if(! $('.landing-tagline-container').hasClass('landing-tagline-container-left')){

			$('.landing-tagline-container').addClass('bounce').delay(200).queue(function(){
			   $(this).removeClass('bounce'); 
			   $(this).dequeue();
			});

			$('.landing-tagline-container').addClass('landing-tagline-container-left')
			$('.landing-tagline-container').removeClass('landing-tagline-container-center')
		}
		else{
			$('.landing-tagline-container').addClass('bounce').queue(function(){
			   $(this).removeClass('bounce'); 
			   $(this).dequeue();
			});

			$('.landing-tagline-container').removeClass('landing-tagline-container-left')
			$('.landing-tagline-container').addClass('landing-tagline-container-center')
		}

		if(! $('.landing-logo-container').hasClass('landing-logo-container-left')){

			$('.beta-form-container').removeClass('bounce')
			$('.beta-form-container').addClass('bounce')
			$('.beta-form-container').animate({'right':"15%"}, 300)

			$('.landing-logo-container').addClass('bounce').delay(200).queue(function(){
			   $(this).removeClass('bounce'); 
			   $(this).dequeue();
			});

			$('.landing-logo-container').addClass('landing-logo-container-left')
			$('.landing-logo-container').removeClass('landing-logo-container-center')
		}
		else{
			
			$('.beta-form-container').animate({'right':"-400px"}, 300)

			$('.landing-logo-container').addClass('bounce').delay(200).queue(function(){
			   $(this).removeClass('bounce'); 
			   $(this).dequeue();
			});

			$('.landing-logo-container').removeClass('landing-logo-container-left')
			$('.landing-logo-container').addClass('landing-logo-container-center')
		}
		

		// if(! $('.landing-logo-container').hasClass('landing-logo-container-left')){
		// 	$('.landing-logo-container').addClass('landing-logo-container-left')
		// 	$('.beta-form-container').animate({'right':"15%"}, 300)

			// $('.landing-logo-container').queue(function(){
			// 	$('.beta-form-container').animate({'right':"15%"}, 300)
			// 	$(this).animate({'marginLeft':"15%"}, 300).delay(3).queue(function () {
			// 		//$('.landing-tagline-container').animate({'marginLeft':"18%"}, 300)
			// 		$('.landing-tagline-container').addClass('landing-tagline-container-center')
			// 		$('.landing-tagline-container').removeClass('landing-tagline-container-center')
			// 	}).dequeue()
			// })
	    
	}
})

Template.contact.events({
	'click #contact-submit' : function(e,t){
		e.preventDefault()

		var fromEmail = $('#contact-email').val()
		var fromName = $('#contact-name').val()
		var message = $('#contact-message').text()

		console.log('Email sending from : ',fromEmail,' from Name. ',fromName,' with message : ',message)
		Meteor.call('sendContactEmail', fromEmail, fromName, message, function(error,response){
			if(error){
				swal(error.reason,"Sorry, we couldn't submit your contact request.  Please fix and try again.")
				return
			}
		})
	}

})