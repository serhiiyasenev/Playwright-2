import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/cart.page";
import { LoginPage } from "../pages/login.page";
import { CheckoutPage } from "../pages/checkout.page";

test.describe("Checking the cart", () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let loginPage: LoginPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    loginPage = new LoginPage(page);
    checkout = new CheckoutPage(page);

    await inventoryPage.navigate();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("Add single item to cart", async ({ page }) => {
    await inventoryPage.clickInventory();
    await inventoryPage.addItemToCart();
    await inventoryPage.openCart();

    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toContain("Sauce Labs Backpack");
  });

  test("Add two items to cart and finish the order", async ({ page }) => {
    await inventoryPage.addItemsToCart(["bolt-t-shirt", "bike-light"]);
    await inventoryPage.openCart();

    const cartItems = await cartPage.getCartItems();
    expect(cartItems).toContain("Sauce Labs Bolt T-Shirt");
    expect(cartItems).toContain("Sauce Labs Bike Light");

    await cartPage.clickCheckOut();

    await checkout.fillChechoutInfo("John", "Doe", "12345");
    await checkout.clickContinue();
    await checkout.clickFinish();

    const title = await checkout.getPageTitle();
    const confirmationMessage = await checkout.getConfirmationMessage();
    const isBackToProductsButtonEnabled = await checkout.isBackToProductsButtonEnabled();
    expect(title).toBe("Checkout: Complete!");
    expect(confirmationMessage).toBe("Thank you for your order!");
    expect(isBackToProductsButtonEnabled).toBeTruthy();
  });
});