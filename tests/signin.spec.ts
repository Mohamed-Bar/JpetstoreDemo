import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SignInPage } from '../pages/SignInPage';
import { makeTestUser } from '../utils/data';

test.describe('Sign In', () => {
  test('signs in with newly registered credentials', async ({ page }) => {
    const reg = new RegistrationPage(page);
    const login = new SignInPage(page);
    const user = makeTestUser();

    // Ensure user exists by registering first
    await reg.goto();
    await reg.register(user);

    // Sign in using the freshly registered credentials
    await login.goto();
    await login.signIn(user.username, user.password);
    await login.expectSignedIn(user.username);
  });
});
