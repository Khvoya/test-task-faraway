// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { initialSetup } from '@synthetixio/synpress/commands/metamask';
import { prepareMetamask } from '@synthetixio/synpress/helpers';
import * as metamask from '@synthetixio/synpress/commands/metamask';
import { chromium, BrowserContext } from '@playwright/test';
import { mainFixtures } from './fixtures';

type TestFixtures = {
  metamaskSetup: boolean;
  context: BrowserContext;
  metamask: typeof metamask;

};

const test = mainFixtures.extend<TestFixtures>({
  metamaskSetup: true,
  context: async ({metamaskSetup}, use) => {
    let context: BrowserContext;
    if (metamaskSetup) {
      // required for synpress
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    global.expect = expect;
    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.METAMASK_VERSION || '10.25.0',
    );
      // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      '--remote-debugging-port=9222',
    ];
    if (process.env.CI) {
      browserArgs.push('--disable-gpu');
    }
    if (process.env.HEADLESS_MODE) {
      browserArgs.push('--headless=new');
    }
    // launch browser
    context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs,
    });
      // wait for metamask
    await context.pages()[0].waitForTimeout(3000);
    await context.pages()[0].close();
    
    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: process.env.SEED_PHRASE_OR_PRIVATE_KEY,
      password: '99999999',
      network: 'sepolia',
      enableAdvancedSettings: true,
    });
    } else {
      context = await chromium.launchPersistentContext("")
    }
    await use(context);
    await context.close();
  },

  metamask: async ({}, use) => {
    await use(metamask);
  },

});

export default test;
export const { expect } = test;