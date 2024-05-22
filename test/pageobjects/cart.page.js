import { $ } from '@wdio/globals'
import Page from './page.js';


class CartPage extends Page {
    get title () {
        return $('.title');
    }

    get addedProductName () {
        return $('.inventory_item_name');
    }

    get checkoutBtn () {
        return $('#checkout');
    }

    async getTitleText() {
        return titleElement.getText();
    
    }
    async getAddedProductName() {
        return await this.addedProductName.getText();
    }

    async openCheckoutPage() {
        const checkoutBtn = await this.checkoutBtn;
        await checkoutBtn.click();
    }   
    
}

export default new CartPage();