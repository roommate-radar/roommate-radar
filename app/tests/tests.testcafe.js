import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { profileslistPage } from './profileslist.page';
import { userprofilePage } from './userprofile.page';
import { createprofilePage } from './createprofile.page';
import { editprofilePage } from './editprofile.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'PhroggyChair', password: 'changeme' };

fixture('Roommate Radar localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the profiles list page shows up', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoProfilesListPage(testController);
  await profileslistPage.isDisplayed(testController);
});

test('Test that the user profile page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.isDisplayed(testController);
});

test('Test that the create profile page shows up', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, 'Sealene', 'sseahorse@hawaii.edu', 'changeme');
  await createprofilePage.isDisplayed(testController);
});

test('Test that the edit profile page shows up', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.gotoEditprofilePage(testController);
  await editprofilePage.isDisplayed(testController);
});

test('Test that CreateProfile correctly adds a profile to the ProfilesCollection Mongo collection', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSignupPage(testController);
  await signupPage.signupUser(testController, 'kittykat', 'kcat@hawaii.edu', 'changeme');
  await createprofilePage.createProfile(testController, 'Kathryn', 'Cat', 'female',
    'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTg0NTEzNzgyNTMyNDE2OTk5/black-cat-gettyimages-901574784.jpg',
    'History', '2 0 2 2', 'Hello!');
});

test('Test that EditProfile correctly updates the values of a profile in the ProfilesCollection Mongo collection', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.gotoUserProfilePage(testController);
  await userprofilePage.gotoEditprofilePage(testController);
  await editprofilePage.isDisplayed(testController);
  await editprofilePage.updateFirstName(testController, 'Philip');
  await editprofilePage.updateGender(testController, 'male');
});
