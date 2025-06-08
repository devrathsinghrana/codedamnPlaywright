import { test, expect } from "@playwright/test";
import BlogPage from "../pages/blog.page";

test.describe("Blog", () => {
  let blogPage: BlogPage;
  test("Verify Recent Posts count and verify the length of each list item", async ({
    page,
  }) => {
    blogPage = new BlogPage(page);
    // open blog page
    await blogPage.navigate();

    // get the recent post list elements
    // const recentPostsList = page.locator("#recent-posts-3 ul li");

    // loop through the list and assert the char length > 10
    for (const el of await blogPage.recentPostsList.elementHandles()) {
      console.log(await el.textContent());
      // ! (Non-null assertion)
      // Tells TypeScript: “Trust me, this result is not null or undefined.”
      // Risky, but useful when you're confident textContent() will not be null.
      expect(((await el.textContent())?.trim())!.length).toBeGreaterThan(1);
    }
    // assert the total length = 5
    expect(await blogPage.recentPostsList.count()).toEqual(5);
  });
});
