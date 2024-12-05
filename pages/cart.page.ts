import { Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async getCartItems(): Promise<string[]> {
    return this.page.locator(".inventory_item_name").allTextContents();
  }
}
