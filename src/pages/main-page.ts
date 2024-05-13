import { Page, Locator } from '@playwright/test';
import { AuthPage } from '../components/auth-page';
import { CheckoutModal } from '../components/checkout-modal';

export class MainPage {
  readonly url: string;
  readonly root: Page;
  readonly connectInNewTabButton: Locator;
  readonly logoutButton: Locator;
  readonly blockchainSelect: Locator;
  readonly purchaseUrlInput: Locator;
  readonly purchaseSubmit: Locator;

  readonly checkoutModal: CheckoutModal;

  constructor(root: Page, baseURL: string) {
    this.url = `${baseURL}demo/`;
    this.root = root;
    this.connectInNewTabButton = this.root.locator('#connect-tab');
    this.logoutButton = this.root.locator('#logout');
    this.blockchainSelect = this.root.locator('#blockchain');
    this.purchaseUrlInput = this.root.locator('#purchase-image-url');
    this.purchaseSubmit = this.root.locator('#purchase');

    this.checkoutModal = new CheckoutModal(root.locator('#faraway-checkout'));
  }

  async openAuthPageInNewTabByConnect(): Promise<AuthPage> {
    const newTabPromise = this.root.waitForEvent('popup');
    await this.connectInNewTabButton.click();
    const newTabContext = await newTabPromise;
    const authPage = new AuthPage(newTabContext);
    await authPage.root.waitForLoadState("networkidle")
    return authPage;
  }

  async selectBlockchain(blockchain: string): Promise<void> {
    await this.blockchainSelect.selectOption(blockchain);
  }

  async setPurchaseUrlAndSubmit(url: string): Promise<void> {
    await this.purchaseUrlInput.fill(url);
    await this.purchaseSubmit.click();
    await this.checkoutModal.buyButton.waitFor({ timeout: 15000 });
    await this.root.waitForLoadState('networkidle');
  }
}
