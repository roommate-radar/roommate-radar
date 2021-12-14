import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

/* global document */
console.log(Meteor.absoluteUrl());
// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  process.env.MAIL_URL = 'smtp://ineedtest642%40gmail.com:abc123xyz@smtp.gmail.com:465/';
  console.log(process.env);
  render(<App/>, document.getElementById('root'));
});
