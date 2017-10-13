import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import $ from 'jquery';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-toggle/js/bootstrap-toggle.js';

// Import to load these templates
import '../../ui/layouts/application.js';
import '../../ui/pages/landing/landing.js';

// Routes
FlowRouter.route('/', {
    action: function(params) {
        BlazeLayout.render('application', { main: "landing" });
    },
    name : 'landing'
});

