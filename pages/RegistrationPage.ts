import { Page } from '@playwright/test';

export interface UserData {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  languagePreference?: string;
  favouriteCategoryId?: string;
}

export class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('https://petstore.octoperf.com/actions/Account.action?newAccountForm=');
  }

  async register(user: UserData): Promise<void> {
    // Account Information (robust selectors with fallbacks)
    await this.page.locator('input[name="account.username"], input[name="username"]').first().fill(user.username);
    await this.page.locator('input[name="account.password"], input[name="password"]').first().fill(user.password);
    await this.page.locator('input[name="repeatedPassword"], input[name="account.repeatedPassword"], input[name="repeatPassword"], input[name="retypePassword"]').first().fill(user.password);

    // Profile Information
    await this.page.locator('input[name="account.firstName"], input[name="firstName"]').first().fill(user.firstName);
    await this.page.locator('input[name="account.lastName"], input[name="lastName"]').first().fill(user.lastName);
    await this.page.locator('input[name="account.email"], input[name="email"]').first().fill(user.email);
    await this.page.locator('input[name="account.phone"], input[name="phone"]').first().fill(user.phone);
    await this.page.locator('input[name="account.address1"], input[name="address1"]').first().fill(user.address1);
    if (user.address2) await this.page.locator('input[name="account.address2"], input[name="address2"]').first().fill(user.address2);
    await this.page.locator('input[name="account.city"], input[name="city"]').first().fill(user.city);
    await this.page.locator('input[name="account.state"], input[name="state"]').first().fill(user.state);
    await this.page.locator('input[name="account.zip"], input[name="zip"]').first().fill(user.zip);
    await this.page.locator('input[name="account.country"], input[name="country"]').first().fill(user.country);

    // Preferences (best-effort as labels may vary)
    const languageSelect = this.page.locator('select[name="account.languagePreference"]');
    if (await languageSelect.count()) {
      await languageSelect.selectOption(user.languagePreference ?? 'english');
    }
    const categorySelect = this.page.locator('select[name="account.favouriteCategoryId"]');
    if (await categorySelect.count()) {
      await categorySelect.selectOption(user.favouriteCategoryId ?? 'FISH');
    }
    // Optional checkboxes
    const listOption = this.page.locator('input[name="account.listOption"]');
    if (await listOption.count()) await listOption.check();
    const bannerOption = this.page.locator('input[name="account.bannerOption"]');
    if (await bannerOption.count()) await bannerOption.check();

    // Submit
    const submit = this.page.locator('input[type="submit"][value="Save Account Information"], input[name="newAccount"], button:has-text("Save Account Information")');
    await submit.first().click();
  }
}
