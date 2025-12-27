import { Page, expect } from '@playwright/test';

export class SignInPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('https://petstore.octoperf.com/actions/Account.action?signonForm=');
  }

  async signIn(username: string, password: string): Promise<void> {
    await this.page.locator('input[name="username"], input[name="account.username"]').first().fill(username);
    await this.page.locator('input[name="password"], input[name="account.password"]').first().fill(password);
    const submit = this.page.locator('input[type="submit"][value="Login"], input[type="submit"][value*="Sign"], button:has-text("Login"), button:has-text("Sign In")');
    await submit.first().click();
  }

  async expectSignedIn(username?: string): Promise<void> {
    // Validate user is signed in by presence of Sign Out link or welcome message
    const signOutLink = this.page.getByRole('link', { name: /Sign Out/i });
    if (await signOutLink.count()) {
      await expect(signOutLink).toBeVisible();
      return;
    }
    if (username) {
      await expect(this.page.getByText(new RegExp(username, 'i'))).toBeVisible();
    }
  }
}
