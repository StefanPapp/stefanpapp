import { test, expect } from '@playwright/test';

test.describe('Cookie Consent', () => {
  test('banner appears on first visit (no localStorage)', async ({ page }) => {
    // Ensure localStorage is empty (fresh context)
    await page.goto('/');

    const banner = page.locator('#cookie-consent');

    // Banner should be visible — translate-y-full removed on first visit
    await expect(banner).not.toHaveClass(/translate-y-full/);
  });

  test('accepting hides banner and sets localStorage cookie_consent=granted', async ({ page }) => {
    await page.goto('/');

    const banner = page.locator('#cookie-consent');
    await expect(banner).not.toHaveClass(/translate-y-full/);

    await page.locator('#cookie-accept').click();

    // Banner should slide back down (translate-y-full re-added)
    await expect(banner).toHaveClass(/translate-y-full/);

    const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
    expect(consent).toBe('granted');
  });

  test('declining hides banner and sets localStorage cookie_consent=denied', async ({ page }) => {
    await page.goto('/');

    const banner = page.locator('#cookie-consent');
    await expect(banner).not.toHaveClass(/translate-y-full/);

    await page.locator('#cookie-decline').click();

    // Banner should slide back down
    await expect(banner).toHaveClass(/translate-y-full/);

    const consent = await page.evaluate(() => localStorage.getItem('cookie_consent'));
    expect(consent).toBe('denied');
  });

  test('banner does not appear on return visit after accepting', async ({ page }) => {
    // Set localStorage before navigating to simulate a return visit
    await page.goto('/');
    await page.evaluate(() => localStorage.setItem('cookie_consent', 'granted'));

    // Reload to simulate return visit
    await page.reload();

    const banner = page.locator('#cookie-consent');

    // Banner should remain hidden (keep translate-y-full class)
    await expect(banner).toHaveClass(/translate-y-full/);
  });
});
