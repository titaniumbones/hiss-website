import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display hero section", async ({ page }) => {
    // Check hero title (H1 in hero section)
    const heroSection = page.locator(".home__hero");
    await expect(heroSection).toBeVisible();
    await expect(heroSection.getByRole("heading", { level: 1 })).toContainText(
      "Humanities"
    );
  });

  test("should display founding departments", async ({ page }) => {
    // Check departments section
    const deptSection = page.locator(".home__departments");
    await expect(deptSection).toBeVisible();

    // Check some department links within that section
    await expect(
      deptSection.getByRole("link", { name: "Anthropology" })
    ).toBeVisible();
  });

  test("should display mission section", async ({ page }) => {
    // Check mission section
    const missionSection = page.locator(".home__mission");
    await expect(missionSection).toBeVisible();

    // Check mission items exist
    await expect(missionSection.locator(".home__mission-item")).toHaveCount(4);
  });

  test("should display CTA buttons", async ({ page }) => {
    // Check CTA section
    const ctaSection = page.locator(".home__cta");
    await expect(ctaSection).toBeVisible();

    // Check CTA buttons within that section
    await expect(
      ctaSection.getByRole("link", { name: "View Events" })
    ).toBeVisible();
    await expect(
      ctaSection.getByRole("link", { name: "Learn More" })
    ).toBeVisible();
  });

  test("should have correct meta title", async ({ page }) => {
    await expect(page).toHaveTitle(/HISS/);
  });
});
