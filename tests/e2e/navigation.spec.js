import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('all nav links are present and visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    const expectedLinks = [
      { label: 'AI Engineering', href: '/ai-engineering' },
      { label: 'Data Transformations', href: '/data-transformations' },
      { label: 'Worldview', href: '/worldview' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Investments', href: '/investments' },
      { label: 'Contact', href: '/contact' },
    ];

    for (const { label } of expectedLinks) {
      const link = nav.getByRole('link', { name: label });
      await expect(link).toBeVisible();
    }
  });

  test('clicking Contact nav link navigates to /contact/ with h1 "Get in Touch"', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    const nav = page.locator('nav[aria-label="Main navigation"]');
    await nav.getByRole('link', { name: 'Contact' }).click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole('heading', { level: 1, name: 'Get in Touch' })).toBeVisible();
  });

  test('logo links back to home', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/contact/');

    const logo = page.locator('a').filter({ hasText: 'Stefan Papp' }).first();
    await logo.click();

    await expect(page).toHaveURL(/^http:\/\/localhost:4321\/?$/);
  });

  test('mobile menu toggle opens and closes at 375px viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const toggle = page.locator('#mobile-menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');

    // Menu starts closed
    await expect(mobileMenu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');

    // Open the menu
    await toggle.click();
    await expect(mobileMenu).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    // Close the menu
    await toggle.click();
    await expect(mobileMenu).toBeHidden();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
