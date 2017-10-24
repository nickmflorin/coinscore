// This defines all the collections, publications and methods that the application provides
// as an API to the client.
import './register-api.js';

Meteor.startup(function () {
  smtp = {
    username: 'info@alluminate.io', 
    //username: 'nickmflorin@gmail.com',
    password: '7CC&hXz*Ka5Ks3go#a#^ipmER^*Hh0@R',  
    server:   'smtp.gmail.com',  
    port: 587 // previously 465
  }
  process.env.MAIL_URL = 'smtps://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});