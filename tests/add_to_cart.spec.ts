import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { SignInPage } from '../pages/SignInPage';
import { CatalogPage } from '../pages/CatalogPage';
import { makeTestUser } from '../utils/data';

test.describe('Add to Cart', () => {
  test('adds an item to cart after sign-in', async ({ page }) => {
    const user = makeTestUser();
    const reg = new RegistrationPage(page);
    const login = new SignInPage(page);
    const catalog = new CatalogPage(page);

    // Register and sign in
    await reg.goto();
    await reg.register(user);
    await login.goto();
    await login.signIn(user.username, user.password);
    await login.expectSignedIn(user.username);

    // Add an item to the cart
    await catalog.goto();
    await catalog.addAnyItemToCart();
  });
});
