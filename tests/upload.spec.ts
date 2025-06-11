import test, { expect } from '@playwright/test';
import CartPage from '../pages/cart.page';
import path from 'path';

test.describe('Upload File normally without dom manipulation as needed for hidden input file field', () => {
  let cartPage: CartPage;
  test('should upload a test file', async ({ page }) => {
    cartPage = new CartPage(page);
    // Open url
    await page.goto('/cart');

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, '../data/herobg.png');

    // upload test file
    cartPage.uploadComponent().uploadFile(filePath);

    // assertion
    // cartPage.uploadComponent(). this will not auto suggest page as we have made it private
    await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully');
  });
  test('should upload a test file pdf and hardcoded wait', async ({ page }) => {
    cartPage = new CartPage(page);

    // Open url
    await page.goto('/cart');

    // store test file path which will be uploaded
    // Note: This file is larger than 2 MB, so it will take more time to upload
    // and we will use this to test the upload progress
    // So we need to wait for the upload to complete thus waits are introduced
    const filePath = path.join(__dirname, '../data/3-mb-file.pdf');

    // upload test file
    cartPage.uploadComponent().uploadFile(filePath);

    // hardcoded sleep - WRONG WAY( AS file may have taken less than 5 seconds to upload so it increase test time more than actual time)
    await page.waitForTimeout(5000);

    // assertion
    await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully');
  });
  test('should upload a test file pdf and conditional wait', async ({ page }) => {
    cartPage = new CartPage(page);

    // Open url
    await page.goto('/cart');

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, '../data/3-mb-file.pdf');

    // upload test file
    cartPage.uploadComponent().uploadFile(filePath);

    // conditional wait - RIGHT WAY
    await cartPage.uploadComponent().successTxt.waitFor({
      state: 'visible',
      timeout: 10000,
      // this will wait for the element to be visible for 10 seconds if condition is met within 1 second then it will not wait for whole 10 seconds which is it's advantage over hardcoded wait
    });

    // assertion
    await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully');
  });
  test('should upload a test file pdf and assertion wait', async ({ page }) => {
    cartPage = new CartPage(page);

    // Open url
    await page.goto('/cart');

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, '../data/3-mb-file.pdf');

    // upload test file
    cartPage.uploadComponent().uploadFile(filePath);

    // assertion
    await expect(cartPage.uploadComponent().successTxt).toContainText(
      'uploaded successfully',
      { timeout: 10000 } // this will wait for the assertion to be true for 10 seconds and if test pass it will terminate the wait and complete test
    );
  });
  test('should upload a test file in hidden input field', async ({ page }) => {
    cartPage = new CartPage(page);

    // Open url
    await page.goto('/cart');

    // store test file path which will be uploaded
    const filePath = path.join(__dirname, '../data/herobg.png');

    // DOM manipulation to make hidden input file field visible
    await page.evaluate(() => {
      const input = document.querySelector('input#upfile_1');
      if (input) {
        input.className = ''; // make the hidden input visible
      }
    });

    // upload test file
    cartPage.uploadComponent().uploadFile(filePath);

    // assertion
    await expect(cartPage.uploadComponent().successTxt).toContainText('uploaded successfully');
  });
});
