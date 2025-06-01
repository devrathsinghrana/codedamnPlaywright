import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("Open HomePage and verify title", async ({ page }) => {
    /*
    What happens if we skip await from below line.
    
    Error: page.goto: Test ended.
    navigating to "https://practice.sdetunicorns.com/", waiting until "load"
    */
    //open url
    await page.goto("https://practice.sdetunicorns.com/")

    /*
    What happens when below assertion fails

    Error: Timed out 5000ms waiting for expect(locator).toHaveTitle(expected)

    Locator: locator(':root')
    Expected string: "Practicee E-Commerce Site – SDET Unicorns"
    Received string: "Practice E-Commerce Site – SDET Unicorns"
    */
    //verify title
    await expect(page).toHaveTitle("Practice E-Commerce Site – SDET Unicorns")
  });
});
