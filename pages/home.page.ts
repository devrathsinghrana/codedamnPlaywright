import { Page, Locator } from '@playwright/test';
class HomePage {
  // Page and Locator types help in auto suggestions for methods and properties
  // of Playwright's Page and Locator classes, making it easier to write tests
  page: Page;
  getStartedBtn: Locator;
  headingText: Locator;
  homeLink: Locator;
  searchIcon: Locator;
  navLinks: Locator;
  constructor(page) {
    this.page = page;
    this.getStartedBtn = page.locator('#get-started');
    this.headingText = page.locator('text=Think different. Make different.');
    this.homeLink = page.locator('#zak-primary-menu >> text=Home');
    this.searchIcon = page.locator(
      "//*[contains(@class, 'zak-header-actions--desktop')]//*[contains(@class, 'zak-header-search__toggle')]//*[contains(@class, 'zak-icon') and contains(@class, 'zakra-icon--magnifying-glass')]"
    );
    this.navLinks = page.locator('#zak-primary-menu li[id*=menu]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  getNavLinksText() {
    return this.navLinks.allTextContents();
  }
}

export default HomePage;
