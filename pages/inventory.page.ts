import { Page, expect } from "@playwright/test";

export class InventoryPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/inventory.html");
  }

  async addItemToCart() {
    const addCartButton = this.page.locator(
      "[data-test=add-to-cart-sauce-labs-backpack]"
    );
    const isEnabled = await addCartButton.isEnabled();
    await expect(isEnabled).toBeTruthy();
    await addCartButton.click();
  }

  async addItemsToCart(items: string[]) {
    for (const item of items) {
        const itemButton = this.page.locator(`[data-test=add-to-cart-sauce-labs-${item}]`);
        await itemButton.click();
    }
 }

  async clickInventory() {
    const isVisible = await this.page
      .locator("[data-test=inventory-item-name]")
      .first()
      .isVisible();
    expect(isVisible).toBeTruthy();
  }

  async openCart() {
    await this.page.click(".shopping_cart_link");
  }
}
