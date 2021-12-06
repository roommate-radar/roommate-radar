import { Selector } from 'testcafe';

class ProfilesListPage {
  constructor() {
    this.pageId = '#profileslist-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const profileslistPage = new ProfilesListPage();
