import { test, expect } from "@playwright/test";
import ContactPage from "../pages/contact.page";

test.describe("Contact", () => {
  let contactPage: ContactPage;
  test("Fill contact form and verify success message", async ({ page }) => {
    contactPage = new ContactPage(page);
    // open contact page
    contactPage.navigate();

    // await page.pause();//this will open trace viewer and we can debug the test case

    // fill out input fields
    contactPage.submitForm(
      "Test Name",
      "test@email.com",
      "134567864",
      "This is a test message"
    );
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
    await expect(contactPage.successTxt).toHaveText(
      "Thanks for contacting us! We will be in touch with you shortly"
    );
  });
});
