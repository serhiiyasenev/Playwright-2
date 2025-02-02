import { Page } from "@playwright/test";

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillChechoutInfo(firstName: string, lastname: string, zipPostalCode: string) {
    await this.page.fill("#first-name", firstName);
    await this.page.fill("#last-name", lastname);
    await this.page.fill("#postal-code", zipPostalCode);
  }

  async clickContinue() {
    await this.page.click("#continue");
  }

  async clickFinish() {
    await this.page.click("#finish");
  }

  async getConfirmationMessage(): Promise<null | string> {
    return this.page.locator("[data-test=complete-header]").textContent();
  }

  async getPageTitle(): Promise<null | string> {
    return this.page.locator("[data-test=title]").textContent();
  }

  async isBackToProductsButtonEnabled(): Promise<boolean> {
    return this.page.locator("[data-test=back-to-products]").isEnabled();
  }
}
