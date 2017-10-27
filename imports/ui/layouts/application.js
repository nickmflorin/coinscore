import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

import { $ } from 'meteor/jquery';
import moment from 'moment';

import '.././stylesheets/plugins/font-awesome.min.css';
import '.././stylesheets/plugins/bootstrap-toggle/bootstrap-toggle.min.css';
import '.././stylesheets/plugins/chartist/chartist.min.css';

import '.././stylesheets/base.css';
import '.././stylesheets/root.css';
import '.././stylesheets/buttons.css';
import '.././stylesheets/brand.css';

import '.././stylesheets/normalize.css';
import '.././stylesheets/alert.css';
import '.././stylesheets/responsive.css';

import './application.html';
import './nav.css';

Template.application.helpers({
   isAClientPage : function(c, o) {
        let routeName = FlowRouter.getRouteName();
        return (routeName !== 'landing' && routeName !== 'admin');
   }    
});

Template.navbarTemplate.events({
    /* Sidebar Show-Hide On Mobile */
    "click .sidebar-open-button-mobile" : function(e, t) {
        $(".sidebar").toggle(150);
    },
    'click .sidebar-open-button' :  function(e, t) {
        if ($('.sidebar').hasClass('hidden-sidebar')) {
            $('.sidebar').removeClass('hidden-sidebar');
            $('.content').removeClass('hidden-content')
        }
        else {
            $('.sidebar').addClass('hidden-sidebar');
            $('.content').addClass('hidden-content')
        }
    },
    'click button[name="navbar-menu-button"]' : function(e, t){
        var attr_id = $(e.target).attr('id')
        var pivot = attr_id + '-pivot'
        var nav = $('.navbar-top').height()
        var top = $('#' + pivot).offset().top - nav
        $('html, body').animate({
            scrollTop: top
        }, 400);
    }
  
});


