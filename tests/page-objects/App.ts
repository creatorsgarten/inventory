import { expect, Page } from "@playwright/test";
import { PageObject, PageObjectContext } from "./PageObject";

export class App extends PageObject {
  get loginPage() {
    return new LoginPage(this.context);
  }

  get itemListPage() {
    return new ItemListPage(this.context);
  }

  async expectSuccessMessage(text: string) {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  generateTagId() {
    return (
      "TS" +
      (parseInt(crypto.randomUUID().slice(0, 8), 16) % 100000)
        .toString()
        .padStart(5, "0")
    );
  }

  generateItemName() {
    return "Test item " + crypto.randomUUID().slice(0, 8);
  }
}

export class LoginPage extends PageObject {
  async goto() {
    await this.page.goto("/auth/login");
  }

  async signUp() {
    await this.page.getByRole("link", { name: "Sign up" }).click();
    await expect(
      this.page.getByRole("link", { name: "Sign up" })
    ).not.toBeVisible();
  }

  async fillSignUpForm(email: string, password: string) {
    await this.page.getByLabel("Email address").fill(email);
    await this.page.getByLabel("Password").fill(password);
  }

  async submitSignUpForm() {
    await this.page.getByRole("button", { name: "Sign Up" }).click();
  }
}

export class ItemListPage extends PageObject {
  async clickAddItem() {
    await this.page.getByRole("button", { name: "Add Item" }).click();
  }

  get newItemDialog() {
    return new ItemListPageNewItemDialog(this.context);
  }
}

export class ItemListPageNewItemDialog extends PageObject {
  async fillItemDetails(name: string, description: string) {
    await this.page.getByLabel("Item name").fill(name);
    await this.page.getByLabel("Description").fill(description);
  }

  async scanTag(tagId: string) {
    await this.page.getByRole("button", { name: "Scan tag" }).click();
    await this.page.getByText("Input manually").click();
    for (let [i, char] of tagId.split("").entries()) {
      await this.page.getByRole("textbox").nth(i).pressSequentially(char);
    }
  }

  async submitItemForm() {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }
}
