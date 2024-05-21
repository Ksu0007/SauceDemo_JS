import { $ } from '@wdio/globals'
import Page from './page.js';

class CheckoutPage extends Page {

   
    get checkoutForm () {
        return $('.checkout_info');
    }

    get firstNameInput () {
        return $('#first-name');
    }
    get lastNameInput () {
        return $('#last-name');
    }
    get zipInput () {
        return $('#postal-code')
    }

    get continueBtn () {
        return $('#continue');
    }

    async isCheckoutPageDisplayed() {
        const result = await this.checkoutForm.isDisplayed();
        return result;
    }

    async fillInCheckoutForm(firstName, lastName, zip) {
        await Promise.all([
          this.firstNameInput.setValue(firstName),
          this.lastNameInput.setValue(lastName),
          this.zipInput.setValue(zip),
        ]);
      
        await this.continueBtn.click();
      }

}

export default new CheckoutPage();