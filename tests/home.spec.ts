import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("Open HomePage and verify title", async ({ page }) => {
    /*
    What happens if we skip await from below line.

    Error: page.goto: Test ended.
    navigating to "https://practice.sdetunicorns.com/", waiting until "load"
    */
    //open url
    await page.goto("https://practice.sdetunicorns.com/");

    /*
    What happens when below assertion fails

    Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

    Locator: locator(':root')
    Expected string: "Practicee E-Commerce Site – SDET Unicorns"
    Received string: "Practice E-Commerce Site – SDET Unicorns"
    */
    //verify title
    await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns");
  });
  test("Open AboutPage and verify title", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com/about");

    //verify title
    await expect(page).toHaveTitle("About – Practice E-Commerce Site");
  });
  test("Click get started button using css selector", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    //  click the button
    await page.locator("#get-started").click(); //id selector is used

    //verify url has #get-started
    await expect(page).toHaveURL(
      "https://practice.sdetunicorns.com/#get-started"
    );
  });
  test("Click get started button using css selector and regex", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    //  click the button
    await page.locator("#get-started").click(); //id selector is used

    //verify url has #get-started
    await expect(page).toHaveURL(/.*#get-started/);
  });
  test("Verifying heading text using text selector", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    //  find the text locator. Text should be unique
    const headingText = page.locator("text=Think different. Make different.");

    //verify heading text is visible. not checking if on going to that page heading text is there but whatever page we are in currently heading text is visible. Assertion is done on the locator not page
    await expect(headingText).toBeVisible();
  });
  test("Verify home link is enabled using text and css selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // find home text
    const homeText = page.locator("#zak-primary-menu >> text=Home");

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  });
  test("Verify home link is enabled using css selector", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // find home text
    const homeText = page.locator('#zak-primary-menu:has-text("Home")');

    // verify home text is enabled
    await expect(homeText).toBeEnabled();
  });
  test("Verify search icon is visible using xpath selector", async ({
    page,
  }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // Find the search icon
    const searchIcon = page.locator(
      "//*[contains(@class, 'zak-header-actions--desktop')]//*[contains(@class, 'zak-header-search__toggle')]//*[contains(@class, 'zak-icon') and contains(@class, 'zakra-icon--magnifying-glass')]"
    );
    //   verify search icon is visible
    await expect(searchIcon).toBeVisible();
  });
  test("Verify text of all nav links", async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // Find the nav links.
    const navLinks = page.locator("#zak-primary-menu li[id*=menu]");
    //   verify nav links text. allTextContents -  Returns an array of node.textContent values for all matching nodes. so order an value of links both will be verified on one condition that expectedLinks array has correct ordered links.
    expect(await navLinks.allTextContents()).toEqual(expectedLinks);
  });
  test("Verify text of particular nav link", async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // Find the nav link using nth locator
    const navLink = page.locator("#zak-primary-menu li[id*=menu]").nth(3);
    //   verify nav link text
    expect(await navLink.textContent()).toEqual(expectedLinks[3]);
  });
  test("Verify text of first nav link", async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // Find the nav link using nth locator
    const navLink = page.locator("#zak-primary-menu li[id*=menu]").first();
    //   verify nav link text
    expect(await navLink.textContent()).toEqual(expectedLinks[0]);
  });
  test("Verify text of last nav link", async ({ page }) => {
    const expectedLinks = [
      "Home",
      "About",
      "Shop",
      "Blog",
      "Contact",
      "My account",
    ];
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    // Find the nav link using nth locator
    const navLink = page.locator("#zak-primary-menu li[id*=menu]").last();
    //   verify nav link text
    expect(await navLink.textContent()).toEqual(expectedLinks[-1]);
  });
});
