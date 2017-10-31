import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import $ from 'jquery';

import './landing.html';

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

function show_SignupForm(){
	$('.landing-header-content').addClass('landing-header-content-with-beta-form')
	$('.landing-button-cont').addClass('landing-button-cont-with-beta-form')
	$('.beta-form-container').addClass('beta-form-showing')
	$('.beta-form-container').removeClass('beta-form-hidden')
}

function hide_SignupForm(){
	$('.landing-header-content').removeClass('landing-header-content-with-beta-form')
	$('.landing-button-cont').removeClass('landing-button-cont-with-beta-form')
	$('.beta-form-container').removeClass('beta-form-showing')
	$('.beta-form-container').addClass('beta-form-hidden')
}

Template.beta.events({
	'click .beta-close-button' : function(e, t){
		$('.beta-form-container').removeClass('beta-form-showing')
		$('.beta-form-container').addClass('beta-form-hidden')
	}
})

Template.beta.onRendered( function() {
	$('#beta-form').validate(
	    'rules':{
	      'beta-email': {required: true, email: true},
	      'beta-name': {required:true},
	  	},
	  	'messages':{
	  		'beta-email': {required: 'You need to provide your email.', email: 'Please enter a valid email address.'},
	     	'beta-name': {required:'Please provide us with a contact name for when we reach back to you.'},
	  	}
	)
});

Template.beta.events({
	'click .beta-cancel' : function(e, t){
		hide_SignupForm()
	},
	'submit #beta-form' : function(e,t){
		e.preventDefault()
		var signupData = {}

		var fromEmail = $('#beta-email').val()
		var fromName = $('#beta-name').val()

		signupData.email = $('input[name="beta-email"]').val()
		signupData.name = $('input[name="beta-name"]').val()

		for(var i = 0; i<Object.keys(signupData).length; i++){
			var keys = Object.keys(signupData)
			if(signupData[keys[i]]){
				signupData[keys[i]] = signupData[keys[i]].trim()
			}
		}

		for(var i = 0; i<Object.keys(signupData).length; i++){
			var keys = Object.keys(signupData)
			if(!signupData[keys[i]] || signupData[keys[i]] == ""){
				swal('Submission Error','There was a problem with submitting your contact information.  Please check the form and try again.')
				return
			}
		}

		Meteor.call('sendSignupEmail', signupData, function(error,response){
			if(error){
				swal(error.reason,"Sorry, we couldn't submit your signup request.  Please fix and try again.")
				return
			}
			hide_SignupForm()
			swal('Thank you for signing up!','We will contact you soon with more information about how to proceed.')
		})
	}
})

Template.landingHeader.events({
	'click #try-beta' : function(e,t){
		e.preventDefault()
		if(!$('.landing-header-content').hasClass('landing-header-content-with-beta-form')){
			show_SignupForm()
		}
		else{
			hide_SignupForm()
		}
	}
})

Template.contact.onRendered( function() {
	$('#contact-form').validate(
	    'rules':{
	      'contact-email': {required: true, email: true},
	      'contact-message': {required: true},
	      'contact-name': {required:true},
	  	},
	  	'messages':{
	  		'contact-email': {required: 'You need to provide your email.', email: 'Please enter a valid email address.'},
	      	'contact-message': {required: 'Please provide a brief description of why you are contacting us.'},
	     	'contact-name': {required:'Please provide us with a contact name for when we reach back to you.'},
	  	}
	)
});

Template.contact.events({
	'submit .contact-form' : function(e,t){
		e.preventDefault()
		var emailData = {}

		emailData.email = $('input[name="contact-email"]').val()
		emailData.name = $('input[name="contact-name"]').val()
		emailData.message = $('#contact-message').val()

		for(var i = 0; i<Object.keys(emailData).length; i++){
			var keys = Object.keys(emailData)
			if(emailData[keys[i]]){
				emailData[keys[i]] = emailData[keys[i]].trim()
			}
		}

		for(var i = 0; i<Object.keys(emailData).length; i++){
			var keys = Object.keys(emailData)
			if(!emailData[keys[i]] || emailData[keys[i]] == ""){
				swal('Submission Error','There was a problem with submitting your contact information.  Please check the form and try again.')
				return
			}
		}

		Meteor.call('sendContactEmail', emailData, function(error,response){
			if(error){
				swal(error.reason,"Sorry, we couldn't submit your contact request.  Please fix and try again.")
				return
			}
			swal('Thank you for your request.','We will contact you soon with a follow up regarding your inquiry.')
		})
	}

})