import { Page, expect } from '@playwright/test';

export class CatalogPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(): Promise<void> {
    await this.page.goto('https://petstore.octoperf.com/actions/Catalog.action');
  }

  async addAnyItemToCart(): Promise<void> {
    // Choose a category and add a product. Navigate directly to FISH category for reliability.
    await this.page.goto('https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH');

    // Click first product in the list
    const firstProduct = this.page.locator('#Catalog a[href*="productId"]').first();
    await firstProduct.click();

    // Click first item SKU
    const firstItem = this.page.locator('#Catalog a[href*="itemId"]').first();
    await firstItem.click();

    // Add to cart
    const addToCart = this.page.locator('input[type="submit"][value="Add to Cart"], button:has-text("Add to Cart"), a:has-text("Add to Cart")');
    await addToCart.first().click();

    // Expect Shopping Cart is visible
    await expect(this.page.getByRole('heading', { name: /Shopping Cart/i })).toBeVisible();
    // Ensure at least one cart row (beyond header) exists
    await expect(this.page.locator('#Cart tr').nth(1)).toBeVisible();
  }
}
