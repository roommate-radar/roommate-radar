import { Selector } from 'testcafe';

class UserProfilePage {
  constructor() {
    this.pageId = '#userprofile-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async gotoEditprofilePage(testController) {
    await testController.click('#userprofile-editprofile');
  }
}

export const userprofilePage = new UserProfilePage();
