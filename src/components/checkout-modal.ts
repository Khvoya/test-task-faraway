import { Locator, FrameLocator } from '@playwright/test';

export class CheckoutModal {
  readonly root: Locator;
  readonly frame: FrameLocator;
  readonly walletConnectButton: Locator;
  readonly buyButton: Locator;
  readonly connectedMetamask: Locator;
  readonly successMessage: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.frame = root.frameLocator('iframe');
    this.walletConnectButton = this.frame.getByTestId('payrow');
    this.buyButton = this.frame
      .locator('[data-testid="totalprice"]+div :first-child')
      .first();
    this.connectedMetamask = this.frame.getByText('MetaMask');
    this.successMessage = this.frame.getByText('View transaction in');
  }

  async connectWallet(): Promise<void> {
    await this.walletConnectButton.waitFor();
    await this.walletConnectButton.click();
    await this.connectedMetamask.waitFor();
    await this.connectedMetamask.click();
  }

  async buyItem(): Promise<void> {
    await this.buyButton.click();
  }
}
