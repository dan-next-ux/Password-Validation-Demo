import { test, expect } from "@playwright/test";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";

test("smoke test the password reset page", async ({ page }) => {
  const consoleErrors = [];
  const requestFailures = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("requestfailed", (request) => {
    requestFailures.push(`${request.method()} ${request.url()} :: ${request.failure()?.errorText || "failed"}`);
  });

  await page.goto(baseURL, { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Reset Password" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Please set a new password" })).toBeVisible();

  const images = page.locator("img");
  await expect(images).toHaveCount(9);
  for (let i = 0; i < 9; i += 1) {
    const image = images.nth(i);
    await expect(image).toBeVisible();
    const ok = await image.evaluate((img) => Boolean(img.complete && img.naturalWidth > 0));
    expect(ok).toBeTruthy();
  }

  const passwordInput = page.locator("#new-password");
  await expect(passwordInput).toHaveAttribute("type", "text");

  const toggle = page.getByRole("button", { name: "Hide password" });
  await toggle.click();
  await expect(passwordInput).toHaveAttribute("type", "password");
  await expect(page.getByRole("button", { name: "Show password" })).toBeVisible();

  await page.getByRole("button", { name: "Show password" }).click();
  await expect(passwordInput).toHaveAttribute("type", "text");

  await passwordInput.fill("Password1");

  const ruleChecks = [
    "One lowercase letter",
    "One number",
    "One UPPERCASE letter",
    "8 to 25 characters",
  ];

  for (const label of ruleChecks) {
    const item = page.getByText(label, { exact: true }).locator("..");
    await expect(item).toHaveClass(/password-rules__item--met/);
  }

  await page.getByRole("button", { name: "Set New Password" }).click();
  await expect(page.locator(".password-form")).toBeVisible();

  const urlBeforeHeaderClicks = page.url();
  await page.getByRole("link", { name: "Next home" }).click();
  await expect(page).toHaveURL(urlBeforeHeaderClicks);

  await page.getByRole("link", { name: "Help" }).click();
  await expect(page).toHaveURL(urlBeforeHeaderClicks);

  await page.getByRole("link", { name: "Bag, 1 item" }).click();
  await expect(page).toHaveURL(urlBeforeHeaderClicks);

  const layout = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const main = document.querySelector("main");
    const cta = document.querySelector(".primary-action");
    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      bodyHeight: body.getBoundingClientRect().height,
      mainHeight: main?.getBoundingClientRect().height ?? 0,
      ctaBottom: cta?.getBoundingClientRect().bottom ?? 0,
      viewportHeight: window.innerHeight,
    };
  });

  expect(layout.scrollWidth - layout.clientWidth).toBeLessThanOrEqual(1);
  expect(layout.bodyHeight).toBeGreaterThan(0);
  expect(layout.mainHeight).toBeGreaterThan(0);
  expect(layout.ctaBottom).toBeGreaterThan(0);

  expect(consoleErrors).toEqual([]);
  expect(requestFailures).toEqual([]);

  await page.screenshot({
    path: "tmp/playwright-smoke-home.png",
    fullPage: true,
  });
});
