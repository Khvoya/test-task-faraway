import { Locator, Page } from '@playwright/test';

export class AuthPage {
  readonly root: Page;
  readonly emailInput: Locator;
  readonly verifyCodeInput: Locator;
  readonly submitButton: Locator;
  readonly loggedLink: Locator;

  constructor(root: Page) {
    this.root = root;
    this.emailInput = this.root.getByTestId('email-form-email-input');
    this.verifyCodeInput = this.root.getByTestId(
      'verify-email-form-code-input',
    );
    this.submitButton = this.root.getByTestId('email-form-submit-button');
    this.loggedLink = this.root.getByTestId('log-in-as-link')
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
      await this.verifyCodeInput
        .locator(`:nth-child(${i + 1})`)
        .fill(codeAsArray[i]);
    }
  }
}
