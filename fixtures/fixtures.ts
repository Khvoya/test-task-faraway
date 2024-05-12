import { test as base } from '@playwright/test'
import { MainPage } from '../src/pages/main-page'

export const mainFixtures = base.extend<{
  goToMainPage: void
  mainPage: MainPage
  loginByEmail: void
}>({
  mainPage: async ({ page, baseURL }, use) => {
    const mainPage = new MainPage(page, baseURL as string)
    await use(mainPage)
  },

  goToMainPage: async ({ mainPage, page }, use) => {
    await page.goto(mainPage.url, { waitUntil: 'networkidle' })
    await use()
  },

  loginByEmail: async ({ mainPage, goToMainPage }, use) => {
    const email = 'ta.test.assignment@faraway.com'
    const verifyCode = '378934'
    await mainPage.openAuthModalByConnect()
    await mainPage.authModal.fillEmail(email)
    await mainPage.authModal.submitEmail()
    await mainPage.authModal.fillVerifyCode(verifyCode)
    await mainPage.authModal.root.waitFor({ state: 'hidden' })
    await mainPage.root.waitForLoadState('networkidle')
    await use()
  },
})
