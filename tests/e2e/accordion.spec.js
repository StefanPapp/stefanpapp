import { test, expect } from '@playwright/test';

test.describe('Accordion', () => {
  test('first section (libertarianism) is expanded by default', async ({ page }) => {
    await page.goto('/worldview/');

    const trigger = page.locator('#libertarianism-trigger');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    const content = page.locator('#libertarianism-content');
    await expect(content).toBeVisible();
  });

  test('other sections are collapsed by default', async ({ page }) => {
    await page.goto('/worldview/');

    const growthTrigger = page.locator('#growth-culture-trigger');
    await expect(growthTrigger).toHaveAttribute('aria-expanded', 'false');

    const catsTrigger = page.locator('#cats-trigger');
    await expect(catsTrigger).toHaveAttribute('aria-expanded', 'false');

    const growthContent = page.locator('#growth-culture-content');
    await expect(growthContent).toBeHidden();

    const catsContent = page.locator('#cats-content');
    await expect(catsContent).toBeHidden();
  });

  test('clicking a collapsed section expands it', async ({ page }) => {
    await page.goto('/worldview/');

    const growthTrigger = page.locator('#growth-culture-trigger');
    await expect(growthTrigger).toHaveAttribute('aria-expanded', 'false');

    await growthTrigger.click();

    await expect(growthTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#growth-culture-content')).toBeVisible();
  });

  test('navigating to /worldview/#cats expands the cats section', async ({ page }) => {
    await page.goto('/worldview/#cats');

    const catsTrigger = page.locator('#cats-trigger');
    await expect(catsTrigger).toHaveAttribute('aria-expanded', 'true');

    const catsContent = page.locator('#cats-content');
    await expect(catsContent).toBeVisible();
  });
});
