import { expect } from '@playwright/test';
import test from '../fixtures/fixtures';


test('Purchase item', async ({ mainPage, loginByEmail, baseURL }) => {
  const imgUrl = `${baseURL}demo/public/mint/hotrod.png`
  await mainPage.selectBlockchain("Ethereum")
  await mainPage.setPurchaseUrlAndSubmit(imgUrl)
  await mainPage.checkoutModal.connectWallet()
});