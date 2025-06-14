import { chromium } from '@playwright/test';

async function globalSetup() {
  // This function is run once before all tests
  // You can perform any setup tasks here, such as logging in or setting up test data
  // For example, you might want to log in to a website and save the session state
  // so that it can be reused in tests
  // This is just a placeholder; implement your setup logic as needed
  //   it is outside our playwright test file so we need to manually open and close the chromium browser
  const browser = await chromium.launch();
  const page = await browser.newPage();
  //   need to pass entire file path as it is in utils folder
  await page.goto('https://practice.sdetunicorns.com/my-account');
  // store another state when not logged in
  await page.context().storageState({ path: 'notLoggedInState.json' });

  //   login to the website and save the state
  await page.locator('#username').fill('practiceuser1');
  await page.locator('#password').fill('PracticePass1!');
  await page.locator('[value="Log in"]').click();

  // save signed-in state to "loggedInState.json" by creating a storage state file automatically
  // this file will be used in tests to avoid logging in again. same name should be congigured in playwright
  await page.context().storageState({ path: 'loggedInState.json' });
  await browser.close();
}

export default globalSetup;
// Note: If you need to perform asynchronous operations, ensure that this function returns a Promise
// or is declared as async, as shown above.
// You can also use this setup to create a storage state file that can be used in tests
