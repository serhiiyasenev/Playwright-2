import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";

test.describe("Перевірка корзини", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);

    await inventoryPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Додати до корзини", async ({ page }) => {
    await inventoryPage.clickInventory();
    await inventoryPage.addItemToCart();
    await inventoryPage.openCart();

    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toContain("Sauce Labs Backpack");
  });
});
