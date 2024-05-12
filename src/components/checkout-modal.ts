import { Page, Locator, FrameLocator } from "playwright";
import * as metamask from "@synthetixio/synpress/commands/metamask";

export class CheckoutModal {
  readonly root: Locator;
  readonly frame: FrameLocator;
  readonly walletConnectButton: Locator;
  readonly buyButton: Locator;

  constructor(root) {
    this.root = root;
    this.frame = root.frameLocator('iframe')
    this.walletConnectButton = this.frame.getByTestId("payrow")
    this.buyButton = this.frame.locator('[data-testid="totalprice"]+div :first-child')
  }

  async connectWallet(): Promise<void> {
        await this.walletConnectButton.click();
        await this.root.page().click('#connectButton');
        await metamask.acceptAccess();
  }
}