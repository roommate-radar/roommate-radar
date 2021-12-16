import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(username, email, password, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: username,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ username, email, password, role }) => createUser(username, email, password, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
if (Meteor.isServer) {
  Meteor.startup(() => {
    Accounts.emailTemplates.siteName = 'roommate-radar';
    Accounts.emailTemplates.from = 'roommate-radar <ineedtest624@gmail.com>';
    Accounts.urls.resetPassword = (token) => Meteor.absoluteUrl(`#/reset%2Dpassword/${token}`);
  });
  // ineedtest642@gmail.com
  process.env.MAIL_URL = `smtps://${Meteor.settings.emails.user}:${Meteor.settings.emails.password}@smtp.gmail.com:465/`;
}
