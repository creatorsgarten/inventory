import { test, expect } from "@playwright/test";

test("add item", async ({ page }) => {
  await page.goto("/auth/login");
  await page.getByRole("link", { name: "Sign up" }).click();
  await expect(page.getByRole("link", { name: "Sign up" })).not.toBeVisible();
  await page
    .getByLabel("Email address")
    .fill(`tester-${Date.now()}@inventory.garten`);
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await page.getByRole("button", { name: "Add Item" }).click();
  const tagId =
    "TS" +
    (parseInt(crypto.randomUUID().slice(0, 8), 16) % 100000)
      .toString()
      .padStart(5, "0");
  const itemName = "Test item " + crypto.randomUUID().slice(0, 8);
  await page.getByLabel("Item name").fill(itemName);
  await page.getByLabel("Description").fill("This item is created by a test");
  await page.getByRole("button", { name: "Scan tag" }).click();
  await page.getByText("Input manually").click();
  for (let [i, char] of tagId.split("").entries()) {
    await page.getByRole("textbox").nth(i).pressSequentially(char);
  }
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Item created")).toBeVisible();
  await expect(page.getByText("Item created")).toBeVisible();
});
