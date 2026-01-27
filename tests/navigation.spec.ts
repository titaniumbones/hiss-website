import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate to all main pages", async ({ page }) => {
    // Start from the home page
    await page.goto("/");

    // Check that the header is visible
    await expect(page.locator("header")).toBeVisible();

    // Navigate to Calendar (use header nav link)
    await page
      .locator("header")
      .getByRole("link", { name: "Calendar" })
      .click();
    await expect(page).toHaveURL("/calendar");
    await expect(page.locator("h1")).toContainText("Events Calendar");

    // Navigate to About
    await page.locator("header").getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.locator("h1")).toContainText("About HISS Hub");

    // Navigate to Contact
    await page.locator("header").getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL("/contact");
    await expect(page.locator("h1")).toContainText("Contact Us");

    // Navigate back to Home
    await page.locator("header").getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("should display UTSC Quick Links bar", async ({ page }) => {
    await page.goto("/");

    // Check UTSC Quick Links are present
    const quickLinks = page.locator(".utsc-quick-links");
    await expect(quickLinks).toBeVisible();

    // Check for specific quick links
    await expect(quickLinks.getByRole("link", { name: "Acorn" })).toBeVisible();
    await expect(
      quickLinks.getByRole("link", { name: "Quercus" })
    ).toBeVisible();
    await expect(
      quickLinks.getByRole("link", { name: "Library" })
    ).toBeVisible();
  });

  test("should have working footer links", async ({ page }) => {
    await page.goto("/");

    // Check footer is visible
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Check footer has department links
    await expect(
      footer.getByRole("link", { name: "Anthropology" })
    ).toBeVisible();

    // Check institutional links
    await expect(
      footer.getByRole("link", { name: "Accessibility" })
    ).toBeVisible();
  });
});
