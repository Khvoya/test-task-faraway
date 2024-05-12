import { Locator, FrameLocator } from '@playwright/test';

export class AuthModal {
  readonly root: Locator;
  readonly frame: FrameLocator;
  readonly emailInput: Locator;
  readonly verifyCodeInput: Locator;
  readonly submitButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.frame = root.frameLocator('#faraway-connect-frame');
    this.emailInput = this.frame.getByTestId('email-form-email-input');
    this.verifyCodeInput = this.frame.getByTestId('verify-email-form-code-input');
    this.submitButton = this.frame.getByTestId('email-form-submit-button');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async submitEmail(): Promise<void> {
    await this.submitButton.click();
    await this.verifyCodeInput.waitFor();
  }

  async fillVerifyCode(code: string): Promise<void> {
    const codeAsArray = code.split('');
    for (let i = 0; i < codeAsArray.length; i++) {
      await this.verifyCodeInput.locator(`:nth-child(${i + 1})`).fill(codeAsArray[i]);
    }

  }
}