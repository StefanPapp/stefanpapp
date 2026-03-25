import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('all form fields are present', async ({ page }) => {
    await page.goto('/contact/');

    await expect(page.locator('#field-name')).toBeVisible();
    await expect(page.locator('#field-email')).toBeVisible();
    await expect(page.locator('#field-reason')).toBeVisible();
    await expect(page.locator('#field-message')).toBeVisible();
    await expect(page.locator('#submit-btn')).toBeVisible();
  });

  test('validation shows errors on empty submit', async ({ page }) => {
    await page.goto('/contact/');

    // Click submit without filling in any fields
    await page.locator('#submit-btn').click();

    // Error elements should become visible (not hidden)
    const nameError = page.locator('#error-name');
    const emailError = page.locator('#error-email');
    const reasonError = page.locator('#error-reason');

    await expect(nameError).toBeVisible();
    await expect(emailError).toBeVisible();
    await expect(reasonError).toBeVisible();

    // Verify they contain actual error text
    await expect(nameError).not.toHaveText('');
    await expect(emailError).not.toHaveText('');
    await expect(reasonError).not.toHaveText('');
  });

  test('character count updates when typing in message field', async ({ page }) => {
    await page.goto('/contact/');

    const charCount = page.locator('#char-count');
    await expect(charCount).toHaveText('0');

    const messageField = page.locator('#field-message');
    await messageField.fill('Hello world');

    await expect(charCount).toHaveText('11');
  });
});
