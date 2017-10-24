import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

import { $ } from 'meteor/jquery';
import moment from 'moment';

import { Match } from 'meteor/check'
import { Email } from 'meteor/email'

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

Meteor.methods({
  sendSignupEmail(fromEmail, fromName){
  	var email = 'info@alluminate.io'
  	//var email = 'nickmflorin@gmail.com'

    // Make sure that all arguments are strings.
    var valid = Match.test([fromEmail, fromName], [String]);
    if(!valid){
    	var invalidFields = []
    	if(! Match.test(fromEmail, String)){
    		invalidFields.push('email address')
    	}
    	if(! Match.test(fromName, String)){
    		invalidFields.push('name')
    	}
    	var invalidMessage = 'The fields for ' + invalidFields.join() + ' were invalid.'
    	throw new Meteor.Error('input-error',invalidMessage)
    }

    var sendDate = new Date()
    var subject = String(fromName) + '-coinscore_signup-' +  sendDate.yyyymmdd()

    // Let other method calls from the same client start running, without waiting for the email sending to complete.
    this.unblock();
    Email.send({
	  to: email,
	  from: fromEmail,
	  subject: subject,
	  text: 'This user would like to sign up for CoinScore.',
	});

  },

  sendContactEmail(fromEmail, fromName, message) {
  	var email = 'info@alluminate.io'
  	//var email = 'nickmflorin@gmail.com'

    // Make sure that all arguments are strings.
    var valid = Match.test([fromEmail, fromName, message], [String]);
    if(!valid){
    	var invalidFields = []
    	if(! Match.test(fromEmail, String)){
    		invalidFields.push('email address')
    	}
    	if(! Match.test(fromName, String)){
    		invalidFields.push('name')
    	}
    	if(! Match.test(message, String)){
    		invalidFields.push('message')
    	}
    	var invalidMessage = 'The fields for ' + invalidFields.join() + ' were invalid.'
    	throw new Meteor.Error('input-error',invalidMessage)
    }

    var sendDate = new Date()
    var subject = String(fromName) + '-coinscore_info-' +  sendDate.yyyymmdd()

    // Let other method calls from the same client start running, without waiting for the email sending to complete.
    this.unblock();
    Email.send({
	  to: email,
	  from: fromEmail,
	  subject: subject,
	  text: message,
	});
  }
});
