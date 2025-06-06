import test, { expect } from "@playwright/test";
const path = require("path");

test.describe("Upload File normally without dom manipulation as needed for hidden input file field", () => {
  test("should upload a test file", async ({ page }) => {
    // Open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, "../data/herobg.png");

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    // click the submit button
    await page.locator("#upload_1").click();

    // assertion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully"
    );
  });
  test("should upload a test file in hidden input field", async ({ page }) => {
    // Open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, "../data/herobg.png");

    // DOM manipulation to make hidden input file field visible
    await page.evaluate(() => {
      const input = document.querySelector("input#upfile_1");
      if (input) {
        input.className = ""; // make the hidden input visible
      }
    });

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    // click the submit button
    await page.locator("#upload_1").click();

    // assertion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully"
    );
  });
});
