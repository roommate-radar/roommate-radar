import { Selector } from 'testcafe';

class CreateProfilePage {
  constructor() {
    this.pageId = '#createprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async createProfile(testController, firstname, lastname, gender, image, major, year, description) {
    await this.isDisplayed(testController);
    await testController.typeText('#createprofile-form-firstname', firstname);
    await testController.typeText('#createprofile-form-lastname', lastname);
    if (gender.toLowerCase() === 'male') {
      await testController.click('#createprofile-form-gender-TWFsZQ');
    } else if (gender.toLowerCase() === 'female') {
      await testController.click('#createprofile-form-gender-RmVtYWxl');
    } else if (gender.toLowerCase() === 'nonbinary') {
      await testController.click('#createprofile-form-gender-Tm9uYmluYXJ5');
    }

    await testController.typeText('#createprofile-form-image', image);
    await testController.typeText('#createprofile-form-major', major);
    await testController.click('#createprofile-form-year');
    await testController.pressKey(year)
    await testController.typeText('#createprofile-form-description', description);
    await testController.click('#createprofile-form-submit');
  }
}

export const createprofilePage = new CreateProfilePage();
