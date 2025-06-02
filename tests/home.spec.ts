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
  test("Click get started button using css selector and regex", async ({ page }) => {
    //open url
    await page.goto("https://practice.sdetunicorns.com");

    //  click the button
    await page.locator("#get-started").click(); //id selector is used

    //verify url has #get-started
    await expect(page).toHaveURL(
      /.*#get-started/
    );
  });
});
