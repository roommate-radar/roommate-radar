import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#profileslist-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async updateFirstName(testController, newFirstName) {
    await testController.click('#editprofile-form-firstname');
    await testController.pressKey('ctrl+a backspace');
    await testController.typeText('#editprofile-form-firstname', newFirstName);
  }

  async updateLastName(testController, newLastName) {
    await testController.click('#editprofile-form-lastname');
    await testController.pressKey('ctrl+a backspace');
    await testController.typeText('#editprofile-form-lastname', newLastName);
  }

  async updateGender(testController, newGender) {
    if (newGender.toLowerCase() === 'male') {
      await testController.click('#editprofile-form-gender-??????');
    } else if (newGender.toLowerCase() === 'female') {
      await testController.click('#editprofile-form-gender-??????');
    } else if (newGender.toLowerCase() === 'nonbinary') {
      await testController.click('#editprofile-form-gender-??????');
    }
  }

  async updateImage(testController, newImage) {
    await testController.click('#editprofile-form-image');
    await testController.pressKey('ctrl+a backspace');
    await testController.typeText('#editprofile-form-image', newImage);
  }

  async updateMajor(testController, newMajor) {
    await testController.click('#editprofile-form-major');
    await testController.pressKey('ctrl+a backspace');
    await testController.typeText('#editprofile-form-major', newMajor);
  }

  async updateYear(testController, newYear) {
    await testController.click('#editprofile-form-year');
    await testController.pressKey('ctrl+a backspace');
    await testController.typeText('#editprofile-form-year', newYear);
  }

  async updateDescription(testController, newDescription) {
    await testController.click('#editprofile-form-description');
    await testController.pressKey('ctrl+a backspace');
    await testController.typeText('#editprofile-form-description', newDescription);
  }

  async submitChanges(testController) {
    await testController.click('#editprofile-form-submit');
  }
}

export const editprofilePage = new EditProfilePage();
