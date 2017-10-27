import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

import { $ } from 'meteor/jquery';
import moment from 'moment';

import { Match } from 'meteor/check'
import { Email } from 'meteor/email'

// Need to put in more secure location
var email = 'info@alluminate.io'

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

Meteor.methods({
  sendSignupEmail(signupData){
  	
    // Make sure that all arguments are strings.
    try{
      check(signupData, {'name':String,'email':String});
    }
    catch(e){
      var invalidFields = []
      var keys = Object.keys(signupData)
      for(var i = 0; i<signupData.length; i++){
        if(!Match.test(signupData[keys[i]], String)){
          invalidFields.push(keys[i])
        }
      }
      throw new Meteor.Error('input-error','Error: The following fields were invalid: ' + invalidFields.join(', '))
    }

    var sendDate = new Date()
    var subject = 'coinscore-beta-signup-request_' +  sendDate.yyyymmdd()

    SSR.compileTemplate('htmlEmail', Assets.getText('signup.html'));

    // Let other method calls from the same client start running, without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: email,
      from: signupData.email,
      subject: subject,
      html: SSR.render('htmlEmail', signupData),
    });
    return 
  },

  sendContactEmail(emailData) {

    // Make sure that all arguments are strings.
    try{
      check(emailData, {'name':String,'email':String,'message':String});
    }
    catch(e){
      var invalidFields = []
      var keys = Object.keys(emailData)
      for(var i = 0; i<keys.length; i++){
        if(!Match.test(emailData[keys[i]], String)){
          invalidFields.push(keys[i])
        }
      }
      throw new Meteor.Error('input-error','Error: The following fields were invalid: ' + invalidFields.join(', '))
    }

    var sendDate = new Date()
    var subject = 'coinscore-info-request_' +  sendDate.yyyymmdd()

    SSR.compileTemplate('htmlEmail', Assets.getText('email.html'));

    // Let other method calls from the same client start running, without waiting for the email sending to complete.
    this.unblock();
    Email.send({
      to: email,
      from: emailData.email,
      subject: subject,
      html: SSR.render('htmlEmail', emailData),
    });
    return 

  }
});
