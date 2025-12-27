import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SignInPage } from '../pages/SignInPage';
import { makeTestUser } from '../utils/data';

test.describe('User Registration', () => {
  test('registers a new user with dynamic data', async ({ page }) => {
    const reg = new RegistrationPage(page);
    const user = makeTestUser();

    await reg.goto();
    await reg.register(user);

    // Navigate to sign-in page explicitly and expect input visible
    const signin = new SignInPage(page);
    await signin.goto();
    await expect(page.locator('input[name="username"]')).toBeVisible();
  });
});
