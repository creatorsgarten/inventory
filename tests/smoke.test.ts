import { test } from "@playwright/test";
import { App } from "./page-objects/App";

test("add item", async ({ page }) => {
  const app = new App({ page });
  await app.loginPage.goto();
  await app.loginPage.signUp();

  const email = `tester-${Date.now()}@inventory.garten`;
  const password = "password";
  await app.loginPage.fillSignUpForm(email, password);
  await app.loginPage.submitSignUpForm();

  await app.itemListPage.clickAddItem();
  const tagId = app.generateTagId();
  const itemName = app.generateItemName();
  await app.itemListPage.newItemDialog.fillItemDetails(
    itemName,
    "This item is created by a test"
  );
  await app.itemListPage.newItemDialog.scanTag(tagId);
  await app.itemListPage.newItemDialog.submitItemForm();

  await app.expectSuccessMessage("Item created");
});
