import { test, expect } from "@playwright/test";

test.describe("Contact", () => {
  test("Fill contact form and verify success message", async ({ page }) => {
    // open contact page
    await page.goto("https://practice.sdetunicorns.com/contact");


    await page.pause();

    // fill out input fields
    await page.locator("contact-name input").fill("Test Name");
    await page.locator("contact-email input").fill("test@email.com");
    await page.locator("contact-phone input").fill("134567864");
    await page.locator("contact-message input").fill("This is a test message");

    // By default, failed assertion will terminate test execution. Playwright also supports soft assertions: failed soft assertions do not terminate test execution, but mark the test as failed.
    // add a soft assertion
    await expect
      .soft(page.locator(".contact-message textarea"))
      .toHaveText("Fail test message");

    // click submit
    await page.locator("button[type=submit]").click();

    // say even if we want soft assertions we want to limit the number of failed soft assertions then we can use below check to break further checking of test cases
    expect(test.info().errors.length).toBeLessThan(1);
    
    // verify success message
    const successAlert = page.locator("div[role='alert]");
    await expect(successAlert).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
