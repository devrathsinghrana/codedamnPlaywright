import { test, expect } from '@playwright/test';
import HomePage from '../pages/home.page';

test.describe('Home', () => {
  // HomePage type allows auto suggestions for HomePage class methods and properties
  // so that we don't have to remember the methods and properties of HomePage class
  let homePage: HomePage;

  // below is a hook that is executed before each test. Thus promoting clean code and reusability
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate(); //using page object model
  });

  test('Open HomePage and verify title', async ({ page }) => {
    // homePage = new HomePage(page);
    /*
    What happens if we skip await from below line.

    Error: page.goto: Test ended.
    navigating to "https://practice.sdetunicorns.com/", waiting until "load"
    */
    //open url
    // await homePage.navigate(); //using page object model

    /*
    What happens when below assertion fails

    Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

    Locator: locator(':root')
    Expected string: "Practicee E-Commerce Site – SDET Unicorns"
    Received string: "Practice E-Commerce Site – SDET Unicorns"
    */
    //verify title
    await expect(page).toHaveTitle('Practice E-Commerce Site – SDET Unicorns');
  });
  test.skip('Open AboutPage and verify title', async ({ page }) => {
    //open url
    await page.goto('/about');

    //verify title
    await expect(page).toHaveTitle('About – Practice E-Commerce Site');
  });
  test('Click get started button using css selector', async ({ page }) => {
    // homePage = new HomePage(page);
    //open url
    // await homePage.navigate(); //using page object model

    //  click the button
    // await page.locator("#get-started").click(); //id selector is used
    await homePage.getStartedBtn.click(); //using page object model

    //verify url has #get-started
    await expect(page).toHaveURL('https://practice.sdetunicorns.com/#get-started');
  });
  test('Click get started button using css selector and regex', async ({ page }) => {
    // homePage = new HomePage(page);
    //open url
    // await homePage.navigate(); //using page object model

    //  click the button
    // await page.locator("#get-started").click(); //id selector is used
    await homePage.getStartedBtn.click(); //using page object model

    //verify url don't have #gesdf (This is part of negative assertion)
    await expect(page).not.toHaveURL(/.*#gesdf/);

    //verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  });
  test('Verifying heading text using text selector', async ({ page }) => {
    // homePage = new HomePage(page);

    //open url
    // await homePage.navigate(); //using page object model

    //  find the text locator. Text should be unique
    const headingText = homePage.headingText;

    //verify heading text is visible. not checking if on going to that page heading text is there but whatever page we are in currently heading text is visible. Assertion is done on the locator not page
    await expect(headingText).toBeVisible();
  });
  test('Verify home link is enabled using text and css selector', async ({ page }) => {
    // homePage = new HomePage(page);

    //open url
    // await homePage.navigate(); //using page object model

    // find home text
    const homeText = homePage.homeLink;

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  });
  test('Verify home link is enabled using css selector', async ({ page }) => {
    // homePage = new HomePage(page);

    //open url
    // await homePage.navigate(); //using page object model

    // find home text
    const homeText = page.locator('#zak-primary-menu:has-text("Home")');

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  });
  test('Verify search icon is visible using xpath selector', async ({ page }) => {
    // homePage = new HomePage(page);

    //open url
    // await homePage.navigate(); //using page object model

    // Find the search icon
    const searchIcon = homePage.searchIcon;
    //   verify search icon is visible
    await expect(searchIcon).toBeVisible();
  });
  test('Verify text of all nav links', async ({ page }) => {
    // homePage = new HomePage(page);

    const expectedLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];
    //open url
    // await homePage.navigate(); //using page object model

    // Find the nav links.
    const navLinks = homePage.navLinks;
    //   verify nav links text. allTextContents -  Returns an array of node.textContent values for all matching nodes. so order an value of links both will be verified on one condition that expectedLinks array has correct ordered links.
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);
  });
  test('Verify text of particular nav link', async ({ page }) => {
    // homePage = new HomePage(page);

    const expectedLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];
    //open url
    // await homePage.navigate(); //using page object model

    // Find the nav link using nth locator
    const navLink = homePage.navLinks.nth(3);
    //   verify nav link text
    await expect(navLink).toHaveText(expectedLinks[3]);
  });
  test('Verify text of first nav link', async ({ page }) => {
    // homePage = new HomePage(page);

    const expectedLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];
    //open url
    // await homePage.navigate(); //using page object model

    // Find the nav link using first locator
    const navLink = homePage.navLinks.first();
    //   verify nav link text
    await expect(navLink).toHaveText(expectedLinks[0]);
  });
  test('Verify text of last nav link', async ({ page }) => {
    // homePage = new HomePage(page);

    const expectedLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];
    //open url
    // await homePage.navigate(); //using page object model

    // Find the nav link using last locator
    const navLink = homePage.navLinks.last();
    //   verify nav link text
    await expect(navLink).toHaveText(expectedLinks[expectedLinks.length - 1]);
  });
  test('Verify text of all nav links by iterating each link', async ({ page }) => {
    // homePage = new HomePage(page);

    const expectedLinks = ['Home', 'About', 'Shop', 'Blog', 'Contact', 'My account'];
    //open url
    // await homePage.navigate(); //using page object model

    // Find the nav links using locator
    // const navLinks = homePage.navLinks;
    // let i = 0;
    // elementHandles - NOTE Always prefer using Locators and web assertions over ElementHandles because latter are inherently racy.

    // Resolves given locator to all matching DOM elements. If there are no matching elements, returns an empty list.
    // for (let el of await navLinks.elementHandles()) {
    //   console.log(el.textContent());
    //   //   verify nav link text
    //   expect(await el.textContent()).toEqual(expectedLinks[i]);
    //   i++;
    // }
    expect(await homePage.getNavLinksText()).toEqual(expectedLinks);
  });
});
