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
  test("should upload a test file pdf and hardcoded wait", async ({ page }) => {
    // Open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // store test file path which will be uploaded
    // Note: This file is larger than 2 MB, so it will take more time to upload
    // and we will use this to test the upload progress
    // So we need to wait for the upload to complete thus waits are introduced
    const filePath = path.join(__dirname, "../data/3-mb-file.pdf");

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    // click the submit button
    await page.locator("#upload_1").click();

    // hardcoded sleep - WRONG WAY( AS file may have taken less than 5 seconds to upload so it increase test time more than actual time)
    await page.waitForTimeout(5000);

    // assertion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully"
    );
  });
  test("should upload a test file pdf and conditional wait", async ({
    page,
  }) => {
    // Open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, "../data/3-mb-file.pdf");

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    // click the submit button
    await page.locator("#upload_1").click();

    // conditional wait - RIGHT WAY
    await page.locator("#wfu_messageblock_header_1_1").waitFor({
      state: "visible",
      timeout: 10000,
      // this will wait for the element to be visible for 10 seconds if condition is met within 1 second then it will not wait for whole 10 seconds which is it's advantage over hardcoded wait
    });

    // assertion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully"
    );
  });
  test("should upload a test file pdf and assertion wait", async ({ page }) => {
    // Open url
    await page.goto("https://practice.sdetunicorns.com/cart");

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, "../data/3-mb-file.pdf");

    // upload test file
    await page.setInputFiles("input#upfile_1", filePath);

    // click the submit button
    await page.locator("#upload_1").click();

    // assertion
    await expect(page.locator("#wfu_messageblock_header_1_1")).toContainText(
      "uploaded successfully",
      { timeout: 10000 } // this will wait for the assertion to be true for 10 seconds and if test pass it will terminate the wait and complete test
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
