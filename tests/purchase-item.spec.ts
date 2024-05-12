import { expect } from '@playwright/test';
import test from '../fixtures/synpressFixtures';


test('Purchase item', async ({ mainPage, loginByEmail, baseURL, metamask }) => {
  const imgUrl = `${baseURL}demo/public/mint/hotrod.png`
  await mainPage.selectBlockchain("Ethereum")
  await mainPage.setPurchaseUrlAndSubmit(imgUrl)
  await mainPage.checkoutModal.connectWallet()
  await metamask.acceptAccess();
  await mainPage.checkoutModal.buyItem();
  await metamask.confirmTransaction();
  await expect(mainPage.checkoutModal.successMessage).toBeVisible({timeout: 60000})
});