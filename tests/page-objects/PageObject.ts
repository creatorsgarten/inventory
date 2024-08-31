import { Page } from "@playwright/test";

export interface PageObjectContext {
  page: Page;
}

export abstract class PageObject {
  constructor(protected readonly context: PageObjectContext) {}

  protected get page() {
    return this.context.page;
  }
}
