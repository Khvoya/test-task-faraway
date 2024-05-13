import { Page, Locator } from '@playwright/test';
import { AuthModal } from '../components/auth-modal';
import { CheckoutModal } from '../components/checkout-modal';

export class MainPage {
  readonly url: string;
  readonly root: Page;
  readonly connectButton: Locator;
  readonly logoutButton: Locator;
  readonly blockchainSelect: Locator;
  readonly purchaseUrlInput: Locator;
  readonly purchaseSubmit: Locator;

  readonly authModal: AuthModal;
  readonly checkoutModal: CheckoutModal;

  constructor(root: Page, baseURL: string) {
    this.url = `${baseURL}demo/`;
    this.root = root;
    this.connectButton = this.root.locator('#connect');
    this.logoutButton = this.root.locator('#logout');
    this.blockchainSelect = this.root.locator('#blockchain');
    this.purchaseUrlInput = this.root.locator('#purchase-image-url');
    this.purchaseSubmit = this.root.locator('#purchase');

    this.authModal = new AuthModal(root.locator('#faraway-connect'));
    this.checkoutModal = new CheckoutModal(root.locator('#faraway-checkout'));
  }

  async openAuthModalByConnect(): Promise<void> {
    await this.connectButton.click();
    await this.authModal.emailInput.waitFor();
  }

  async selectBlockchain(blockchain: string): Promise<void> {
    await this.blockchainSelect.selectOption(blockchain);
  }

  async setPurchaseUrlAndSubmit(url: string): Promise<void> {
    await this.purchaseUrlInput.fill(url);
    await this.purchaseSubmit.click();
    // await expect(this.checkoutModal.buyButton).toBeVisible({timeout: 15000});
    await this.checkoutModal.buyButton.waitFor({ timeout: 15000 });

    await this.root.waitForLoadState('networkidle');
  }
}
