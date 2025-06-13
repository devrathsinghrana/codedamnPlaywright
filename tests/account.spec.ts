import { test, expect, Page } from '@playwright/test';

// .serial() is used to run tests in sequence, not in parallel
test.describe.serial('My Account', () => {
  // this beforeEach is very time consuming as we need to login again for each test. so we can use beforeAll hook. But there is a catch that we need to run each test in sequence not parallel as we are loging in once only now so we need to share tis with each browser and we need to change our page context
  let page: Page;
  test.beforeAll(async ({ browser }) => {
    // Create a new browser context and page thus allowing login to be shared only if tests are run in sequence
    page = await browser.newPage();
    await page.goto('/my-account');
    await page.locator('#username').fill('practiceuser1');
    await page.locator('#password').fill('PracticePass1!');
    await page.locator('[value="Log in"]').click();
    await expect(page.locator('a:has-text("Log out")').first()).toBeVisible();
  });

  test('Access Orders', async () => {
    await page.goto('/my-account');
    await page.locator(`li a[href*='orders']`).click();
    await expect(page).toHaveURL(/.*orders/);
  });

  test('Access Downloads', async () => {
    await page.goto('/my-account');
    await page.locator(`li a[href*='downloads']`).click();
    await expect(page).toHaveURL(/.*downloads/);
  });
});

test.describe('Account Page', () => {
  test.use({ storageState: 'notLoggedInState.json' });

  test('Verify login and register is visible', async ({ page }) => {
    await page.goto('/my-account');
    await expect(page.locator('form[class*="login"]')).toBeVisible();
    await expect(page.locator('form[class*="register"]')).toBeVisible();
  });
});
