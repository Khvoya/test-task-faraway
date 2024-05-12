import { expect } from '@playwright/test';
import test from '../fixtures/synpressFixtures';



test('Login with email', async ({ mainPage, loginByEmail }) => {
  const textOnButton = await mainPage.logoutButton.innerText()
  expect(textOnButton).toContain("(frwy-turkey#949dc8)");
});