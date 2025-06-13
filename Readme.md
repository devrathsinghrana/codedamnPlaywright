Below are some recommended playwright extensions

Playwright Runner by Koushik
Koushik Chatterjee

Playwright Test for VSCode
Microsoft
microsoft.com

Playwright Test Snippets
Mark Skelton

---------------------------------------------------------------------------

On root folder simply execute

# npx playwright test

Above command will automatically execute tests file inside tests folder

# npx playwright show-report - This will generate report

<!-- Below are some debug commands for test cases -->
# DEBUG=pw:api npx playwright test home.spec.ts

above command will generate debug console logs and show how playwright works behind the scenes. run above command in git bash to get results

# npx playwright show-trace test-results\contact-Contact-Fill-contact-form-and-verify-success-message-chromium\trace.zip

run above command in powershell for smooth execution. It will open trace viewer

# PWDEBUG=1 npx playwright test contact.spec.ts

run above command to open playwright inspector which breaks the test just like debugger in js.

# Base url in playwright config allows us to write page.goto() actions with only page endpoints

# We use faker js library to handle fake data

# Hooks are common piece of code which can run before or after each test execution according to our implementation

# PARAMETERIZE our tests i.e. we are passing different data in same test using parameters. It is different from randomize test data we used with faker as we can decide the number of tests and the values of parameters for each test. Like we can run a test 3 tests with 3 sets of different data using parameters.

# AUTHENTICATION - we have two test cases - one to access orders and other to access downloads. But they will require authentication. We can't just make login test as even if login test pass we cant communicate the same to access orders and downloads test cases as they are dependent on it so we need work around. Each test is running on separate browser so we need to login before each test run thus beforeEach hook is the work around inside which we will authenticate user before each test execution.