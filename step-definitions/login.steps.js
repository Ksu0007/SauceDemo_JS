import { Given, When, Then } from '@wdio/cucumber-framework'
import loginPage from '../test/pageobjects/login.page.js'

Given('User is located on the main page of saucedemo website', async () => {
  await loginPage.open()
})

When('User clicks on the {string} button', async (buttonText) => {
  await loginPage.login('', '')
})

Then('User should see {string} error message', async (expectedMessage) => {
  await loginPage.checkErrorMessage(expectedMessage)
})
